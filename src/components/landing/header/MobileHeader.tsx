"use client";

import React, { useState } from "react";
import Link from "next/link";

const MobileHeader: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="">
      {" "}
      {/* Add this wrapper */}
      <div className="flex-none lg:hidden">
        <button className="btn btn-square btn-ghost" onClick={toggleDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      {/* Mobile Drawer */}
      <div
        className={`
    lg:hidden 
    absolute top-full left-0 w-full
    transition-all duration-300 ease-in-out
    ${isDrawerOpen ? "opacity-100" : "opacity-0 "}
  `}
      >
        <ul className="menu bg-base-100 w-full p-2 shadow-lg gap-1 text-base">
          <li>
            <Link href="#features" onClick={toggleDrawer}>
              Features
            </Link>
          </li>
          <li>
            <Link href="#how-it-works" onClick={toggleDrawer}>
              How It Works
            </Link>
          </li>
          <li>
            <Link href="#benefits" onClick={toggleDrawer}>
              Benefits
            </Link>
          </li>
          <li>
            <Link href="#tech" onClick={toggleDrawer}>
              Technology
            </Link>
          </li>
          <li>
            <Link href="#faq" onClick={toggleDrawer}>
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileHeader;
