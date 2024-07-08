import React from "react";
import Link from "next/link";
import { NavItem, navItems } from "@/lib/navItems";

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
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

const DashboardCard = ({ name, path, description, icon: Icon }: NavItem) => (
  <Link
    href={path}
    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
  >
    <div className="card-body flex flex-row items-center">
      <div className="flex-shrink-0 mr-4">
        <Icon className="w-12 h-12 text-primary" />
      </div>
      <div>
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  </Link>
);

export default DashboardHome;
