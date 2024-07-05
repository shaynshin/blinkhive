"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UnifiedWalletButton, useWallet } from "@jup-ag/wallet-adapter";
import { logout } from "@/lib/auth";
import { getOrCreateAndSetStorageMessage } from "@/lib/walletAuth";
import WalletWrapper from "@/components/WalletWrapper";
import { useLoggedInStore } from "@/stores/loggedInStore";
import { useActiveRoleStore } from "@/stores/activeRoleStore";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const activeRole = useActiveRoleStore((state) => state.activeRole);
  const setActiveRole = useActiveRoleStore((state) => state.setActiveRole);
  const loggedIn = useLoggedInStore((state) => state.loggedIn);
  const setLoggedIn = useLoggedInStore((state) => state.setLoggedIn);

  const pathname = usePathname();
  const router = useRouter();
  const wallet = useWallet();

  const closeDrawer = () => {
    const drawer = document.getElementById(
      "dashboard-drawer"
    ) as HTMLInputElement | null;
    if (drawer && drawer.type === "checkbox") {
      drawer.checked = false;
    }
  };

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

  const hiddenNavitems = {
    merchant: [
      ...navItems.merchant,
      { name: "Login", path: "/dashboard/login" },
    ],
    affiliate: [
      ...navItems.affiliate,
      { name: "Connect", path: "/dashboard/connect" },
    ],
  };

  useEffect(() => {
    if (
      hiddenNavitems.affiliate.some((item) => pathname.startsWith(item.path))
    ) {
      setActiveRole("affiliate");
    } else if (
      hiddenNavitems.merchant.some((item) => pathname.startsWith(item.path))
    ) {
      setActiveRole("merchant");
    }
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
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
          <div className="flex-1 hidden sm:block">
            <Link
              href="/"
              className="normal-case text-2xl font-bold flex gap-2"
            >
              <svg
                width={32}
                viewBox="0 0 250 250"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1_11)">
                  <path
                    d="M233.09 104.392C233.09 152.611 193.866 191.877 145.587 191.877C120.072 191.877 99.2595 171.118 99.2595 145.558H82.2493C82.2493 180.472 110.666 208.834 145.537 208.834C203.172 208.834 250 161.965 250 104.392H233.09Z"
                    fill="#00CDB8"
                  />
                  <path
                    d="M58.0849 145.608C58.0849 120.098 78.8473 99.2897 104.413 99.2897V82.2829C69.4917 82.2829 41.1247 110.694 41.1247 145.558C41.1247 203.181 88.0028 250 145.587 250V232.993C97.3584 233.043 58.0849 193.828 58.0849 145.608Z"
                    fill="#00CDB8"
                  />
                  <path
                    d="M104.413 58.1233C129.928 58.1233 150.74 78.8816 150.74 104.442H167.751C167.751 69.5278 139.334 41.1665 104.463 41.1665C46.8281 41.1665 0 88.0352 0 145.608H17.0102C16.9101 97.3389 56.1837 58.1233 104.413 58.1233Z"
                    fill="#00CDB8"
                  />
                  <path
                    d="M191.865 104.392C191.865 129.902 171.103 150.71 145.537 150.71V167.717C180.458 167.717 208.825 139.306 208.825 104.442C208.825 46.8187 161.947 0 104.363 0V17.0068C152.642 16.9568 191.865 56.1725 191.865 104.392Z"
                    fill="#00CDB8"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_11">
                    <rect width="250" height="250" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p>
                shill<span className="text-accent">.</span>
                <span className="font-light">fm</span>
              </p>
            </Link>
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
                    buttonClassName="btn btn-primary !text-sm"
                    currentUserClassName="btn btn-primary !text-sm"
                  />
                ) : loggedIn ? (
                  <button onClick={handleLogout} className="btn btn-primary">
                    Logout
                  </button>
                ) : (
                  <Link href="/dashboard/login" className="btn btn-primary">
                    Login
                  </Link>
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
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content sm:text-base">
          {navItems[activeRole].map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={pathname === item.path ? "active" : ""}
                onClick={closeDrawer}
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
