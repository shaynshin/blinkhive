import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="footer footer-center bg-base-200 p-10">
      <aside>
        <svg
          width={48}
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
        <div className="font-bold mt-1">
          <Link href="/" className="normal-case text-2xl mx-auto gap-2 text-neutral-300">
            <p>
              shill<span className="text-accent">.</span>
              <span className="font-light">fm</span>
            </p>
          </Link>
          <br />
          Shill what you love and earn good money.
        </div>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="https://x.com/shillfm" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          <a href="https://t.me/shaynshin" target="_blank">
            <svg
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 511.999 511.999"
              className="fill-current"
            >
              <path d="M165.323,267.452L395.89,125.446c4.144-2.545,8.407,3.058,4.849,6.359L210.454,308.684 c-6.688,6.226-11.003,14.558-12.225,23.602l-6.482,48.036c-0.858,6.414-9.868,7.05-11.638,0.843l-24.929-87.595 C152.325,283.578,156.486,272.907,165.323,267.452z"></path>
              <path d="M9.043,246.86l117.975,44.032l45.664,146.854c2.922,9.405,14.423,12.882,22.057,6.641l65.761-53.61 c6.893-5.617,16.712-5.897,23.916-0.667l118.61,86.113c8.166,5.936,19.736,1.461,21.784-8.407l86.888-417.947 c2.236-10.779-8.356-19.772-18.62-15.802L8.905,220.845C-3.043,225.453-2.939,242.369,9.043,246.86z M165.323,267.452 L395.89,125.446c4.144-2.545,8.407,3.058,4.849,6.359L210.454,308.684c-6.688,6.226-11.003,14.558-12.225,23.602l-6.482,48.036 c-0.858,6.414-9.868,7.05-11.638,0.843l-24.929-87.595C152.325,283.578,156.486,272.907,165.323,267.452z"></path>
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
