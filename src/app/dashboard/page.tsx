// src/app/dashboard/page.tsx

import DashboardHome from '@/components/DashboardHome';

export default function DashboardPage() {
  const activeRole = "affiliate";

  return <DashboardHome activeRole={activeRole} />;
}