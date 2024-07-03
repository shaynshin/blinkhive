import DashboardHome from "@/components/DashboardHome";

export default function DashboardPage() {
  const activeRole = "merchant";

  return <DashboardHome activeRole={activeRole} />;
}
