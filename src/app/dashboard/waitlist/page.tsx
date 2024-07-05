"use client";

import React, { Suspense } from "react";
import TallyEmbed from "@/components/TallyEmbed";
import { useActiveRoleStore } from "@/stores/activeRoleStore";
import { useSearchParams } from "next/navigation";

const LoadingAnimation = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
    <span className="loading loading-bars loading-lg text-info" />
  </div>
);

function WaitlistContent() {
  const setActiveRole = useActiveRoleStore((state) => state.setActiveRole);
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  React.useEffect(() => {
    if (role === "merchant") setActiveRole("merchant");
    if (role === "affiliate") setActiveRole("affiliate");
  }, [role, setActiveRole]);

  return <TallyEmbed />;
}

export default function DashboardWaitlistPage() {
  return (
    <Suspense fallback={<LoadingAnimation />}>
      <WaitlistContent />
    </Suspense>
  );
}
