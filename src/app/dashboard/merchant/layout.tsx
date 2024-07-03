"use client";

import withAuth from "@/components/withAuth";

const MerchantDashboardLayout = ({ children }: { children: React.ReactNode }) =>
  children;

export default withAuth(MerchantDashboardLayout);
