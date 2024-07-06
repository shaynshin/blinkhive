import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute top-4 md:top-6 w-full z-30 pb-4 md:pb-6 border-b [border-image:linear-gradient(to_right,transparent,theme(colors.cyan.300/.4),transparent)1] dark:[border-image:linear-gradient(to_right,transparent,theme(colors.cyan.300/.16),transparent)1] shadow-[0_1px_0_0_theme(colors.white/.2)] dark:shadow-none">
      <div className="px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center h-12">
            {/* Border with dots in corners */}
            <div aria-hidden="true" />
            {/* Site branding */}
            <div className="flex">
              {/* Logo */}
              <Link
                href="/"
                className="normal-case text-2xl font-bold flex gap-2 text-neutral-300"
              >
                <svg
                  width={28}
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
          </div>
        </div>
      </div>
    </header>
  );
}
