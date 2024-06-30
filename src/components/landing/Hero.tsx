import Link from 'next/link';
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Revolutionize Your Digital Product Sales</h1>
          <p className="py-6">Blockchain-Powered Affiliate Marketing for the Digital Age</p>
          <Link href="/dashboard" className="btn btn-primary mr-2">For Merchants</Link>
          <Link href="/dashboard" className="btn btn-secondary mr-2">For Affiliates</Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;