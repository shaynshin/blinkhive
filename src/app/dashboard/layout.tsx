"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DashboardWrapper from "@/components/DashboardWrapper";
import withAuth from "@/components/withAuth";
import { logout } from "@/lib/auth";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [activeRole, setActiveRole] = useState<"merchant" | "affiliate">(
    "affiliate"
  );
  const router = useRouter();

  const navItems = {
    merchant: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Products", path: "/dashboard/products" },
      { name: "Merchant Analytics", path: "/dashboard/analytics/merchant" },
    ],
    affiliate: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Browse Products", path: "/dashboard/browse" },
      { name: "My Blinks", path: "/dashboard/blinks" },
      { name: "Wallet Settings", path: "/dashboard/settings" },
      { name: "Analytics", path: "/dashboard/analytics/affiliate" },
    ],
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Top Navigation Bar */}
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 text-xl font-md">
            <span className="text-4xl"> 🦦 </span> &nbsp; Beaverblink
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <button
                  onClick={() => setActiveRole("merchant")}
                  className={activeRole === "merchant" ? "active" : ""}
                >
                  Merchant
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveRole("affiliate")}
                  className={activeRole === "affiliate" ? "active" : ""}
                >
                  Affiliate
                </button>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
        {/* Page Content */}
        <main className="flex-grow p-6">
          {/* <div className="toast toast-top toast-end">
            <div role="alert" className="alert shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info h-6 w-6 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div>
                <h3 className="font-bold">New message!</h3>
                <div className="text-xs">You have 1 unread message</div>
              </div>
              <button className="btn btn-sm">See</button>
            </div>
          </div> */}
          <DashboardWrapper activeRole={activeRole}>
            {children}
          </DashboardWrapper>
        </main>
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          {navItems[activeRole].map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={pathname === item.path ? "active" : ""}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default withAuth(DashboardLayout);
