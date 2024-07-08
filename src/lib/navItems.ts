import {
  ShoppingBagIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  GlobeAltIcon,
  ShoppingCartIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

export type NavItem = {
  name: string;
  path: string;
  description: string;
  icon: any;
};

export type NavItems = {
  merchant: NavItem[];
  affiliate: NavItem[];
};

export const navItems: NavItems = {
  merchant: [
    {
      name: "Manage Products",
      path: "/dashboard/merchant/products",
      description: "Manage your products",
      icon: ShoppingBagIcon,
    },
    {
      name: "Analytics",
      path: "/dashboard/merchant/analytics",
      description: "View your sales analytics",
      icon: ChartBarIcon,
    },
    {
      name: "Account Settings",
      path: "/dashboard/merchant/settings",
      description: "Manage your account settings",
      icon: Cog6ToothIcon,
    },
  ],
  affiliate: [
    {
      name: "Web3 Protocols",
      path: "/dashboard/affiliate/protocols",
      description: "Find Web3 protocols to shill",
      icon: GlobeAltIcon,
    },
    {
      name: "Digital Products",
      path: "/dashboard/affiliate/browse",
      description: "Find digital products to promote",
      icon: ShoppingCartIcon,
    },
    {
      name: "Manage Blinks",
      path: "/dashboard/affiliate/blinks",
      description: "Manage your affiliate blinks",
      icon: LinkIcon,
    },
    {
      name: "Analytics",
      path: "/dashboard/affiliate/analytics",
      description: "View your affiliate performance",
      icon: ChartBarIcon,
    },
  ],
};
