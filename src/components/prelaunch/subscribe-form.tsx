import Image from "next/image";
import Jup from "../../../public/images/jup.jpg";
import Bonk from "../../../public/images/bonk.jpg";
import Tnsr from "../../../public/images/tnsr.jpg";
import Kmno from "../../../public/images/kmno.jpg";
import Jto from "../../../public/images/jto.png";
import Zeta from "../../../public/images/zeta.jpg";
import Link from "next/link";

export default function SubscribeForm() {
  return (
    <>
      <div className="relative flex items-center justify-center gap-10 before:h-px before:w-full before:border-b before:[border-image:linear-gradient(to_right,transparent,theme(colors.cyan.300/.8),transparent)1] dark:before:[border-image:linear-gradient(to_right,transparent,theme(colors.cyan.300/.16),transparent)1] before:shadow-sm before:shadow-white/20 dark:before:shadow-none after:h-px after:w-full after:border-b after:[border-image:linear-gradient(to_right,transparent,theme(colors.cyan.300/.8),transparent)1] dark:after:[border-image:linear-gradient(to_right,transparent,theme(colors.cyan.300/.16),transparent)1] after:shadow-sm after:shadow-white/20 dark:after:shadow-none mb-11">
        <div className="w-full max-w-xs mx-auto shrink-0">
          <form className="relative">
            {/* Border with dots in corners */}
            <div
              className="absolute -inset-3 bg-cyan-500/15 dark:bg-transparent dark:bg-gradient-to-b dark:from-gray-700/80 dark:to-gray-700/70 rounded-lg -z-10 before:absolute before:inset-y-0 before:left-0 before:w-[15px] before:bg-[length:15px_15px] before:[background-position:top_center,bottom_center] before:bg-no-repeat before:[background-image:radial-gradient(circle_at_center,theme(colors.cyan.500/.56)_1.5px,transparent_1.5px),radial-gradient(circle_at_center,theme(colors.cyan.500/.56)_1.5px,transparent_1.5px)] dark:before:[background-image:radial-gradient(circle_at_center,theme(colors.gray.600)_1.5px,transparent_1.5px),radial-gradient(circle_at_center,theme(colors.gray.600)_1.5px,transparent_1.5px)] after:absolute after:inset-y-0 after:right-0 after:w-[15px] after:bg-[length:15px_15px] after:[background-position:top_center,bottom_center] after:bg-no-repeat after:[background-image:radial-gradient(circle_at_center,theme(colors.cyan.500/.56)_1.5px,transparent_1.5px),radial-gradient(circle_at_center,theme(colors.cyan.500/.56)_1.5px,transparent_1.5px)] dark:after:[background-image:radial-gradient(circle_at_center,theme(colors.gray.600)_1.5px,transparent_1.5px),radial-gradient(circle_at_center,theme(colors.gray.600)_1.5px,transparent_1.5px)]"
              aria-hidden="true"
            />
            <div className="space-y-3">
              <div>
                <Link
                  className="btn-landing text-gray-100 bg-teal-600 hover:bg-teal-500 w-full"
                  href="https://x.com/shillfm"
                  target="_blank"
                >
                  Follow us and notifs on
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          {/* Avatars */}
          <ul className="flex justify-center -space-x-2 mb-4">
            <li>
              <Image
                className="rounded-full"
                src={Jup}
                width={32}
                height={32}
                alt="Avatar 01"
              />
            </li>
            <li>
              <Image
                className="rounded-full"
                src={Bonk}
                width={32}
                height={32}
                alt="Avatar 02"
              />
            </li>
            <li>
              <Image
                className="rounded-full"
                src={Jto}
                width={32}
                height={32}
                alt="Avatar 03"
              />
            </li>
            <li>
              <Image
                className="rounded-full"
                src={Tnsr}
                width={32}
                height={32}
                alt="Avatar 04"
              />
            </li>
            <li>
              <Image
                className="rounded-full"
                src={Kmno}
                width={32}
                height={32}
                alt="Avatar 05"
              />
            </li>
            <li>
              <Image
                className="rounded-full"
                src={Zeta}
                width={32}
                height={32}
                alt="Avatar 06"
              />
            </li>
          </ul>
          <p className="text-sm text-gray-500">
            Shill your favourite protocols{" "}
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              and earn
            </span>{" "}
            ██████.
          </p>
        </div>
      </div>
    </>
  );
}
