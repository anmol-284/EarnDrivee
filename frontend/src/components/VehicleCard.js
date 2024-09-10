import React from 'react';

const VehicleCard = ({ imageUrl, title, price }) => {
  return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 relative">
            <div className="absolute inset-0 bg-pattern opacity-20"></div>
            <section className="container mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start">
                    <div className="p-5 py-10 bg-purple-50 text-center transform duration-500 hover:-translate-y-2 cursor-pointer">
                        <img src="https://www.dropbox.com/s/mlor33hzk73rh0c/x14423.png?dl=1" alt="" />
                        <div className="space-x-1 flex justify-center mt-10">
                            {[...Array(4)].map((_, index) => (
                                <svg
                                    key={index}
                                    className="w-4 h-4 mx-px fill-current text-orange-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 14 14"
                                >
                                    <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z" />
                                </svg>
                            ))}
                            <svg
                                className="w-4 h-4 mx-px fill-current text-gray-300"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 14 14"
                            >
                                <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl my-5">Soft Plushy Cushion Chair</h1>
                        <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, incidunt!</p>
                        <h2 className="font-semibold mb-5">$29.99</h2>
                        <button className="p-2 px-6 bg-purple-500 text-white rounded-md hover:bg-purple-600">Add To Cart</button>
                    </div>

                    <div className="p-5 py-10 bg-green-50 text-center transform duration-500 hover:-translate-y-2 cursor-pointer">
                        <img src="https://www.dropbox.com/s/8ymeus1n9k9bhpd/y16625.png?dl=1" alt="" />
                        <div className="space-x-1 flex justify-center mt-10">
                            {[...Array(4)].map((_, index) => (
                                <svg
                                    key={index}
                                    className="w-4 h-4 mx-px fill-current text-orange-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 14 14"
                                >
                                    <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z" />
                                </svg>
                            ))}
                            <svg
                                className="w-4 h-4 mx-px fill-current text-gray-300"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 14 14"
                            >
                                <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl my-5">Comfortable Wooden Chair</h1>
                        <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, incidunt!</p>
                        <h2 className="font-semibold mb-5">$39.99</h2>
                        <button className="p-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600">Add To Cart</button>
                    </div>

                    <div className="p-5 py-10 bg-red-50 text-center transform duration-500 hover:-translate-y-2 cursor-pointer">
                        <img src="https://www.dropbox.com/s/ykdro56f2qltxys/hh2774663-87776.png?dl=1" alt="" />
                        <div className="space-x-1 flex justify-center mt-10">
                            {[...Array(4)].map((_, index) => (
                                <svg
                                    key={index}
                                    className="w-4 h-4 mx-px fill-current text-orange-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 14 14"
                                >
                                    <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z" />
                                </svg>
                            ))}
                            <svg
                                className="w-4 h-4 mx-px fill-current text-gray-300"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 14 14"
                            >
                                <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl my-5">Wooden Chair</h1>
                        <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, incidunt!</p>
                        <h2 className="font-semibold mb-5">$19.99</h2>
                        <button className="p-2 px-6 bg-red-500 text-white rounded-md hover:bg-red-600">Add To Cart</button>
                    </div>
                </div>
            </section>

  );
};

export default VehicleCard;
