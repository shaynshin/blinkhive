import React from "react";
import Link from "next/link";

type NavItem = {
  name: string;
  path: string;
  description: string;
};

type NavItems = {
  merchant: NavItem[];
  affiliate: NavItem[];
};

const navItems: NavItems = {
  merchant: [
    {
      name: "Manage Products",
      path: "/dashboard/products",
      description: "Manage your products",
    },
    {
      name: "Merchant Analytics",
      path: "/dashboard/merchant/analytics",
      description: "View your sales analytics",
    },
  ],
  affiliate: [
    {
      name: "Browse Products",
      path: "/dashboard/browse",
      description: "Find products to promote",
    },
    {
      name: "Manage Blinks",
      path: "/dashboard/blinks",
      description: "Manage your affiliate blinks",
    },
    {
      name: "Analytics",
      path: "/dashboard/affiliate/analytics",
      description: "View your affiliate performance",
    },
    {
      name: "Wallet Settings",
      path: "/dashboard/settings",
      description: "Manage your wallet settings",
    },
  ],
};

interface DashboardHomeProps {
  activeRole: "merchant" | "affiliate";
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ activeRole }) => {
  const roleSpecificItems = navItems[activeRole] || [];
  const allItems = [...roleSpecificItems];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allItems.map((item) => (
          <DashboardCard
            key={item.path}
            name={item.name}
            path={item.path}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

const DashboardCard = ({ name, path, description }: NavItem) => (
  <Link
    href={path}
    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
  >
    <div className="card-body">
      <h2 className="card-title">{name}</h2>
      <p>{description}</p>
    </div>
  </Link>
);


export default DashboardHome;