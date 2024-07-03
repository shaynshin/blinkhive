import Image from "next/image";
import React from "react";

const TechShowcase: React.FC = () => {
  return (
    <section
      id="tech"
      className="py-16 md:py-24 bg-base-100 bg-opacity-95 bg-repeat"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-success bg-success bg-opacity-10 rounded-full uppercase mb-4">
            Powered by Solana
          </span>
          <h2 className="text-3xl font-bold mb-4 text-base-content">
            Next Generation Affiliate Marketing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div className="bg-base-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-primary">
              Blinks and Actions
            </h3>
            <p className="text-base-content text-opacity-80">
              Blinks (Blockchain Links) unfurl into full experiences, allowing
              users to purchase any products with crypto, without leaving the
              application they are own.
            </p>
          </div>
          <div className="bg-base-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-primary">
              Powered by <span className="solana-gradient">Solana</span>
            </h3>
            <p className="text-base-content text-opacity-80">
              We leverage the speed and efficiency of the Solana blockchain to
              ensure fast transactions and low fees for all our users, providing
              a seamless experience.
            </p>
          </div>
        </div>

        <div className="mt-20 relative max-w-5xl mx-auto">
          <Image
            width={1371}
            height={952}
            src="https://i.ibb.co/9yQsX37/blinks.webp"
            alt="Blinks and Actions Showcase"
            layout="responsive"
          />
        </div>
      </div>
    </section>
  );
};

export default TechShowcase;
