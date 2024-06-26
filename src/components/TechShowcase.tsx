import React from 'react';

const TechShowcase: React.FC = () => {
  return (
    <section id="tech" className="py-12 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Technology</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Blinks and Actions</h3>
            <p>Blinks (Blockchain Links) are a revolutionary way to share Solana transactions. They unfurl into full experiences, making blockchain interactions seamless and user-friendly.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Solana Integration</h3>
            <p>We leverage the speed and efficiency of the Solana blockchain to ensure fast transactions and low fees for all our users.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechShowcase;