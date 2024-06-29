"use client";

import React from "react";
import { usePathname } from "next/navigation";
import DashboardHome from "@/components/DashboardHome";

interface DashboardWrapperProps {
  activeRole: "merchant" | "affiliate";
  children: React.ReactNode;
}

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({
  activeRole,
  children,
}) => {
  const pathname = usePathname();

  if (pathname === "/dashboard") {
    return <DashboardHome activeRole={activeRole} />;
  }

  return <>{children}</>;
};

export default DashboardWrapper;
