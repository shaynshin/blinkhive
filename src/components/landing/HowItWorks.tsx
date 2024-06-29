import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    { title: 'Sign Up', description: 'Create your account as a merchant or affiliate' },
    { title: 'Connect Wallet', description: 'Link your Solana wallet to your account' },
    { title: 'Create or Choose', description: 'Merchants upload products, affiliates select products to promote' },
    { title: 'Share and Earn', description: 'Share your unique Blinks and earn commissions on sales' },
  ];

  return (
    <section className="py-12 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;