import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-base-100 shadow-lg">
      <div className="navbar container mx-auto">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case text-xl">Your Platform Name</Link>
        </div>
        <div className="flex-none hidden lg:block">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="#features">Features</Link></li>
            <li><Link href="#how-it-works">How It Works</Link></li>
            <li><Link href="#benefits">Benefits</Link></li>
            <li><Link href="#tech">Technology</Link></li>
            <li><Link href="#faq">FAQ</Link></li>
          </ul>
        </div>
        <div className="flex-none">
          <Link href="/signup" className="btn btn-primary">Sign Up</Link>
        </div>
        <div className="flex-none lg:hidden">
          <button className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;