import { createMagic } from "./magic";

export const logout = async () => {
  const magic = createMagic();
  if (await magic?.user.isLoggedIn()) {
    await magic?.user.logout();
  }
};
