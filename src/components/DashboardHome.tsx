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
      path: "/dashboard/merchant/products",
      description: "Manage your products",
    },
    {
      name: "Analytics",
      path: "/dashboard/merchant/analytics",
      description: "View your sales analytics",
    },
    {
      name: "Account Settings",
      path: "/dashboard/merchant/settings",
      description: "Manage your account settings",
    },
  ],
  affiliate: [
    {
      name: "Browse Products",
      path: "/dashboard/affiliate/browse",
      description: "Find products to promote",
    },
    {
      name: "Manage Blinks",
      path: "/dashboard/affiliate/blinks",
      description: "Manage your affiliate blinks",
    },
    {
      name: "Analytics",
      path: "/dashboard/affiliate/analytics",
      description: "View your affiliate performance",
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
    className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
  >
    <div className="card-body flex flex-row items-center">
      <div className="flex-shrink-0 mr-4">
        <svg
          className="w-12 h-12 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          {getIconPath(name)}
        </svg>
      </div>
      <div>
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  </Link>
);

// Helper function to return the appropriate SVG path based on the card name
const getIconPath = (name: string) => {
  switch (name) {
    case "Manage Products":
      return <path d="M3 3h18v18H3zM12 8v8m-4-4h8" />;
    case "Analytics":
      return <path d="M16 8v12M12 4v16M8 12v8M4 4h16v16H4z" />;
    case "Account Settings":
      return (
        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      );
    case "Browse Products":
      return <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />;
    case "Manage Blinks":
      return <path d="M13 10V3L4 14h7v7l9-11h-7z" />;
    case "Analytics":
      return (
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      );
    default:
      return <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />;
  }
};

export default DashboardHome;
