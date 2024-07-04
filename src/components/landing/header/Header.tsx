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
            <Link href="/" className="normal-case text-2xl font-bold">
              Blinkhive
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
              className="btn btn-primary"
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
