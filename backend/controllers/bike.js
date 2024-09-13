const Bike = require('../model/bikemodel');
const User = require('../model/usermodel');
const Payment = require('../model/Payment');

exports.postbike = async (req, res) => {
  try {
    const {
      bikeName,
      bikeModel,
      bikeNumber,
      State,
      City,
      Area,
      pricePerHour,
      pinCode,
      listingTime,
      expirationTime,
      description,
    } = req.body;

    // Ensure req.user.id is available
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const userId = req.user.id;

    // Create a new bike instance
    const bike = new Bike({
      bikeName,
      bikeModel,
      bikeNumber,
      State: State.toLowerCase(),
      City: City.toLowerCase(), 
      Area: Area.toLowerCase(),
      pricePerHour,
      pinCode,
      listingTime,
      expirationTime,
      description,
      owner: userId,
    });

    // Save the bike to the database
    const savedBike = await bike.save();

    // Update the user with the new bike ID
    await User.findByIdAndUpdate(userId, { $push: { listedBikes: savedBike._id } });

    // Send success response
    res.status(201).json({
      message: 'Bike listed successfully!',
      bike: savedBike
    });
  } catch (error) {
    // Log the error and send an error response
    console.error('Error while listing bike:', error);
    res.status(400).json({
      message: 'Failed to list bike',
      error: error.message
    });
  }
};

exports.getBikes = async (req, res) => {
    try {
        const { City, State, Area, pinCode } = req.query;
        const filter = { expirationTime: { $gt: new Date() } };

        if (City) {
            filter.City = City;
        }
        if (State) {
            filter.State = State;
        }
        if (Area) {
            filter.Area = Area;
        }
        if (pinCode) {
            filter.pinCode = pinCode;
        }

        const bikes = await Bike.find(filter).populate('owner');
        res.status(200).json(bikes);
    } 
    catch (error) {
        console.error('Error fetching bikes:', error);
        res.status(500).json({ message: 'Failed to fetch bikes' });
    }
};

exports.MyBikes = async (req, res) => {
    try {
        const userId = req.user.id; // Ensure _id is used if the user is from MongoDB
        console.log('Logged in User ID:', userId);

        // Filter bikes where the expiration time is still valid
        const currentTime = new Date(); // Current time
        const bikes = await Bike.find({ 
            owner: userId, 
            expirationTime: { $gt: currentTime } // Only fetch bikes with a future expiration time
        });

        res.status(200).json(bikes);
    } catch (error) {
        console.error('Error fetching listed bikes:', error);
        res.status(500).json({ message: 'Error fetching listed bikes', error });
    }
};

exports.MyRides = async (req, res) => {
    try {
        const userId = req.user._id; // Extract the user ID from the authenticated user

        const payments = await Payment.find({ userId }).populate('bikeId'); // Assuming Payment model has userId reference

        res.json({ success: true, payments });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching payments', error: error.message });
    }
};
