import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        className="w-full text-left text-xl font-semibold bg-white p-4 rounded-lg focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
      </button>
      {isOpen && (
        <div className="mt-2 p-4 bg-white">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I list my bike for rent?",
      answer: "To list your scooty for rent, create an account, navigate to the 'List Your bike' section, and fill out the necessary details about your vehicle."
    },
    {
      question: "What are the requirements for listing a bike?",
      answer: "Your bike must be in good condition, insured, and meet the age and mileage requirements specified in our listing guidelines."
    },
    {
      question: "How do I hire a bike?",
      answer: "To hire a bike, browse through the available listings, select the bike you want, and follow the prompts to complete your booking."
    },
    {
      question: "How do I earn money from renting out my bike?",
      answer: "You earn money each time your bike is rented out. Payments are processed through our secure payment system and transferred to your account."
    },
    {
      question: "What if there is damage to my bike during the rental?",
      answer: "It will be the responsibility of the person who takes your bike to cover any damages that occur during the rental period."
    }
  ];

  return (
    <div className="mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-500">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default FAQSection;
