import { getData, STORAGE_KEYS } from "@storage/index";
import type { LoggedInUser } from "@type/auth";

export const getUserLogin = async (): Promise<LoggedInUser | null> => {
  const curUser = await getData(STORAGE_KEYS.CURRENT_USER);
  if (!curUser) return null;

  try {
    return JSON.parse(curUser) as LoggedInUser;
  } catch {
    return null;
  }
};
