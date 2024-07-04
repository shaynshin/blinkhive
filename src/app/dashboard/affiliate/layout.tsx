"use client";

import withWalletAuth from "@/components/withWalletAuth";

const AffiliateDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => children;

export default withWalletAuth(AffiliateDashboardLayout);
