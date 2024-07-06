import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/logo.png";

export default function Footer() {
  return (
    <footer className="border-t h-16 flex justify-center items-center [border-image:linear-gradient(to_right,transparent,theme(colors.cyan.300/.16),transparent)1] shadow-none">
      <div className="px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <p className="text-sm text-gray-400">© shill.fm</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
