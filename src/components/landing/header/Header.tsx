import React from "react";
import Link from "next/link";
import MobileHeader from "./MobileHeader";

const Header: React.FC = () => {
  return (
    <>
      <div className="h-16 sm:h-20"></div>

      <header className="bg-base-100 shadow-lg flex items-center h-16 fixed top-0 left-0 right-0 z-50 sm:h-20">
        <div className="navbar container mx-auto relative z-1">
          <div className="flex-1">
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
                shill<span className="text-accent">.</span><span className="font-light">fm</span>
              </p>
            </Link>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal px-1 text-base">
              <li>
                <Link href="#features">Features</Link>
              </li>
              <li>
                <Link href="#how-it-works">How It Works</Link>
              </li>
              <li>
                <Link href="#benefits">Benefits</Link>
              </li>
              <li>
                <Link href="#tech">Technology</Link>
              </li>
              <li>
                <Link href="#faq">FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="flex-none">
            <Link
              href="/dashboard/affiliate/browse"
              className="btn btn-accent"
            >
              Get Started
            </Link>
          </div>
          <MobileHeader />
        </div>
      </header>
    </>
  );
};

export default Header;
