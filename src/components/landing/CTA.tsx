import React from 'react';
import Link from 'next/link';

const CTA: React.FC = () => {
  return (
    <section className="py-16 bg-primary text-primary-content">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-8">Join our platform today and revolutionize your digital product sales!</p>
        <Link href="/login" className="btn btn-secondary btn-lg">Get Started Now</Link>
      </div>
    </section>
  );
};

export default CTA;