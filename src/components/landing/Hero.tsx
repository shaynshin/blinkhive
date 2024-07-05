import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="hero min-h-[calc(100vh-5rem)]">
      <div
        className="angled-bg bg-base-200 w-full h-full absolute top-0"
        style={{
          zIndex: -1,
          clipPath: "polygon(0 0, 100% 0, 100% 10%, 0 100%)",
        }}
      ></div>
      <div className="flex container items-center justify-center gap-24 p-4 flex-col lg:flex-row flex-col lg:flex-row">
        <div className="text-center w-full mt-10 lg:mt-0 lg:w-1/2 lg:text-left">
          <h4 className="text-xl font-medium text-accent py-2 px-12 sm:px-0">
            Transparent transactions. Instant payouts.
          </h4>
          <h1 className="text-4xl font-bold">
            Next Generation Affiliate Marketing Platform Powered by{" "}
            <span className="solana-gradient">Solana</span>
          </h1>
          <p className="text-lg py-6">
            Join our cutting-edge blockchain-powered affiliate network{" "}
            <span className="font-bold">for free</span>. Gain access to our
            curated marketplace and start promoting hot selling products and{" "}
            <span className="font-bold">scale your earnings</span>.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-1/2 ">
          <div className="card bg-base-100 border border-base-300 w-full sm:w-1/2 shrink-0 shadow-2xl">
            <figure className="bg-base-200 py-6">
              <Image
                src="https://i.ibb.co/YBcyxCs/Digital-lifestyle-rafiki-1.png"
                alt="Affiliate"
                width={640}
                height={640}
                className="rounded-y-xl object-cover h-64 w-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Affiliates</h2>
              <p>
                Affiliates choose us because of our high-converting affiliate
                offers, transparent transactions, and instant settlement. Get
                started for free!
              </p>
              <Link
                href="/dashboard/affiliate/browse"
                className="mt-6 btn btn-primary text-base 2xl:text-lg"
              >
                Start earning as affiliate
              </Link>
            </div>
          </div>
          <div className="card bg-base-100 border border-base-300 w-full sm:w-1/2 shrink-0 shadow-2xl">
            <figure className="bg-base-200 py-6">
              <Image
                src="https://i.ibb.co/RPd3Pjv/merchant.png"
                alt="Merchant"
                width={640}
                height={640}
                className="rounded-y-xl object-cover h-64 w-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Merchants</h2>
              <p>
                We offer affiliate management solutions for product owners,
                businesses, and brands looking to expose their products to the
                Web3 crowd.
              </p>
              <Link
                href="/dashboard/merchant"
                className="mt-6 btn btn-accent text-base 2xl:text-lg"
              >
                Boost sales as merchant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
