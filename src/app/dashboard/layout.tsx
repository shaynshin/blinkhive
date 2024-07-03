"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UnifiedWalletButton, useWallet } from "@jup-ag/wallet-adapter";
import { logout } from "@/lib/auth";
import { getOrCreateAndSetStorageMessage } from "@/lib/walletAuth";
import WalletWrapper from "@/components/WalletWrapper";
import { createMagic } from "@/lib/magic";
import { Magic } from "magic-sdk";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [activeRole, setActiveRole] = useState<"merchant" | "affiliate">(
    "affiliate"
  );
  const router = useRouter();

  const wallet = useWallet();

  const navItems = {
    merchant: [
      { name: "Dashboard", path: "/dashboard/merchant" },
      { name: "Manage Products", path: "/dashboard/merchant/products" },
      { name: "Analytics", path: "/dashboard/merchant/analytics" },
      { name: "Account Settings", path: "/dashboard/merchant/settings" },
    ],
    affiliate: [
      { name: "Dashboard", path: "/dashboard/affiliate" },
      { name: "Browse Products", path: "/dashboard/affiliate/browse" },
      { name: "Manage Blinks", path: "/dashboard/affiliate/blinks" },
      { name: "Analytics", path: "/dashboard/affiliate/analytics" },
    ],
  };

  useEffect(() => {
    if (navItems.affiliate.some((item) => pathname.startsWith(item.path))) {
      setActiveRole("affiliate");
    } else {
      setActiveRole("merchant");
    }
  }, []);

  useEffect(() => {
    if (
      wallet &&
      wallet.connected &&
      !wallet.disconnecting &&
      wallet.publicKey
    ) {
      getOrCreateAndSetStorageMessage(wallet);
    }
  }, [wallet]);

  const handleLogout = () => {
    logout();
    router.push("/dashboard/login");
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Top Navigation Bar */}
        <div className="w-full navbar bg-base-300 flex justify-between">
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
          <div className="flex-1 px-2 mx-2 text-2xl font-medium max-sm:hidden">
            Blinkhive
          </div>
          <div className="flex-none text-sm">
            <ul className="flex gap-4 px-1 items-center">
              <li>
                <Link
                  href="/dashboard/affiliate"
                  onClick={() => setActiveRole("affiliate")}
                  className={
                    activeRole === "affiliate"
                      ? "text-accent font-medium py-3"
                      : "py-3 hover:text-accent"
                  }
                >
                  Affiliate
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/merchant"
                  onClick={() => setActiveRole("merchant")}
                  className={
                    activeRole === "merchant"
                      ? "text-accent font-medium py-3"
                      : "py-3 hover:text-accent"
                  }
                >
                  Merchant
                </Link>
              </li>
              <li>
                {activeRole === "affiliate" ? (
                  <UnifiedWalletButton
                    buttonClassName="btn"
                    currentUserClassName="btn"
                  />
                ) : (
                  <button onClick={handleLogout} className="btn">
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
        {/* Page Content */}
        <main className="flex-grow p-6 relative">{children}</main>
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

export default WalletWrapper(DashboardLayout);
