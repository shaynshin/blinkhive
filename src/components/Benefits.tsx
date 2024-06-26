import React from 'react';

const Benefits: React.FC = () => {
  const merchantBenefits = [
    "Expand your reach",
    "Increase sales through affiliate network",
    "Automated commission payouts",
  ];

  const affiliateBenefits = [
    "Easy product selection",
    "Instant commission payouts",
    "Customizable Blinks for sharing",
  ];

  return (
    <section id="benefits" className="py-12 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">For Merchants</h3>
            <ul className="list-disc list-inside">
              {merchantBenefits.map((benefit, index) => (
                <li key={index} className="mb-2">{benefit}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">For Affiliates</h3>
            <ul className="list-disc list-inside">
              {affiliateBenefits.map((benefit, index) => (
                <li key={index} className="mb-2">{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;