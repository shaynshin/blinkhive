"use client";

import "./css/style.css";
import Theme from "./theme-provider";

import BgShapes from "@/components/prelaunch/bg-shapes";
import VerticalLines from "@/components/prelaunch/vertical-lines";
import Header from "@/components/prelaunch/header";
import Footer from "@/components/prelaunch/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Theme>
      <body
        className={`antialiased bg-cyan-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 tracking-tight`}
      >
        <div className="relative flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
          <VerticalLines />
          <BgShapes />
          <Header />

          <main className="grow">{children}</main>

          <Footer />
        </div>
      </body>
    </Theme>
  );
}
