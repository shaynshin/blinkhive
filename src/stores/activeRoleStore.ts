// /stores/activeRoleStore.ts

import { create } from "zustand";

type ActiveRoleStore = {
  activeRole: "merchant" | "affiliate";
  setActiveRole: (activeRole: "merchant" | "affiliate") => void;
};

export const useActiveRoleStore = create<ActiveRoleStore>((set) => ({
  activeRole: "affiliate",
  setActiveRole: (activeRole) => set(() => ({ activeRole })),
}));
