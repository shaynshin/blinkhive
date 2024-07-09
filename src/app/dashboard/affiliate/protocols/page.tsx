import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProtocolItem = {
  name: string;
  logo: string;
  description: string;
  products: string[];
  path?: string;
};

const protocolItems: ProtocolItem[] = [
  {
    name: "Jupiter Exchange",
    logo: "https://i.ibb.co/5cJBJJV/jupiter.png",
    description:
      "The Jupiter Swap is a decentralized exchange aggregator designed to provide the best rates for swapping SPL tokens on the Solana blockchain.",
    products: ["DEX Aggregator", "Spot Trading"],
    path: "/dashboard/affiliate/protocols/jupiter",
  },
  {
    name: "Raydium",
    logo: "https://i.ibb.co/9qC2Xbg/image.png",
    description:
      "Raydium is an automated market maker (AMM) platform built on Solana where users can swap, trade and provide liquidity to earn yield on digital assets.",
    products: ["DEX", "Spot Trading"],
  },
  {
    name: "BONKbot",
    logo: "https://i.ibb.co/m0btNJj/image.png",
    description:
      "With routing powered by Jupiter, BONKbot is the fastest way to buy, sell, and manage your trades - keeping you in control.",
    products: ["Trading Bot", "Spot Trading"],
  },
];

const ProtocolPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Protocols</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {protocolItems.map((i, k) => (
          <ProtocolCard
            key={k}
            title={i.name}
            topMargin={"mt-2"}
            products={i.products}
            path={i.path}
          >
            <p className="flex">
              <Image
                alt="icon"
                width={48}
                height={48}
                src={i.logo}
                className="h-12 w-12 inline-block mr-4"
              />
              {i.description}
            </p>
            <div className="mt-6 text-right"></div>
          </ProtocolCard>
        ))}
      </div>
    </div>
  );
};

const ProtocolCard = ({
  // path,
  title,
  children,
  topMargin,
  products,
  path,
}: {
  // path: string;
  title: string;
  topMargin: string;
  children: React.ReactNode;
  products: string[];
  path: string | undefined;
}) => (
  <div
    className={"card w-full p-6 bg-base-100 shadow-xl " + (topMargin || "mt-6")}
  >
    {/* Title for Card */}
    <div className="text-xl font-semibold">{title}</div>

    <div className="divider mt-2"></div>

    {/** Card Body */}
    <div className="h-full w-full pb-2">{children}</div>
    <div className="card-actions justify-between">
      <div className="flex gap-2">
        {products.map((product) => (
          <div className="badge badge-outline">{product}</div>
        ))}
      </div>

      {path ? (
        <Link href={path} className="text-primary/100 hover:text-primary/80 ">
          View →
        </Link>
      ) : (
        <p className="text-neutral-content/70"> Coming soon</p>
      )}
    </div>
  </div>
);

export default ProtocolPage;
