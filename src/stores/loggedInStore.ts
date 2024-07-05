// /stores/userStore.ts

import { create } from "zustand";

type LoggedInStore = {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
};

export const useLoggedInStore = create<LoggedInStore>((set) => ({
  loggedIn: false,
  setLoggedIn: (loggedIn) => set(() => ({ loggedIn })),
}));
