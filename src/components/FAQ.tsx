import React from "react";

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "What are Blinks and how do they work?",
      answer:
        "Blinks, or Blockchain Links, are smart URLs that unfurl into instant checkout experiences. When shared, they allow for seamless transactions directly through social media platforms, leveraging blockchain technology for security and transparency.",
    },
    {
      question: "How do I get started as an affiliate on this platform?",
      answer:
        "To become an affiliate, simply sign up for an account, connect your Solana wallet, and browse our marketplace for digital products you'd like to promote. Once you've selected a product, you can generate unique Blinks to share with your audience.",
    },
    {
      question:
        "I'm a digital product creator. How can I start selling on this platform?",
      answer:
        "As a creator, you can sign up for a merchant account, upload your digital products, set your pricing and commission rates, and start leveraging our network of affiliates. Our platform handles all the blockchain transactions and commission distributions automatically.",
    },
    {
      question: "How does the commission payout work?",
      answer:
        "Commissions are paid out instantly in cryptocurrency to the affiliate's connected Solana wallet as soon as a sale is made through their unique Blink. This ensures fast, secure, and transparent payments without the need for traditional payment processing.",
    },
    {
      question: "Is my data secure on this platform?",
      answer:
        "Absolutely. We leverage blockchain technology to ensure all transactions and data interactions are secure, transparent, and immutable. Your personal information and transaction history are protected by advanced cryptographic methods inherent to blockchain systems.",
    },
    {
      question: "Can I customize my Blinks?",
      answer:
        "Yes, you can customize your Blinks with your own branding elements, including custom domains. This allows you to maintain brand consistency while leveraging our powerful blockchain-based affiliate system.",
    },
    {
      question: "What types of products can be sold on this platform?",
      answer:
        "Currently, our platform specializes in digital products such as e-books, online courses, software, and digital art. We're continuously exploring options to expand into physical product sales in the future.",
    },
  ];

  return (
    <section id="faq" className="py-12 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
