import React from 'react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  { question: 'How do I sign up?', answer: 'You can sign up by clicking on the "Get Started" button on the homepage.' },
  { question: 'What is a whale transaction?', answer: 'A whale transaction is a large transaction involving a significant amount of cryptocurrency, such as 10,000 SOL or more.' },
  { question: 'Can I track specific accounts?', answer: 'Yes, you can track specific accounts and receive alerts for transactions above your set threshold.' },
];

const FAQSection = () => {
  return (
    <section className="faq flex justify-between items-centerpy-20 bg-white my-14">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
