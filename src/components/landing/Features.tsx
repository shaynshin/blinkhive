import React from 'react';

const Features: React.FC = () => {
  const features = [
    { title: 'Instant Payouts', description: 'Receive your commissions instantly through blockchain technology' },
    { title: 'Secure Transactions', description: 'All transactions are secured by Solana blockchain' },
    { title: 'Social Media Integration', description: 'Easily share your affiliate links on major social platforms' },
  ];

  return (
    <section className="py-12 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;