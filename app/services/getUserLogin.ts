import { getData, STORAGE_KEYS } from "@storage";

type LoggedInUser = { name: string; email: string };

export const getUserLogin = async (): Promise<LoggedInUser | null> => {
  const curUser = await getData(STORAGE_KEYS.CURRENT_USER);
  if (!curUser) return null;

  try {
    return JSON.parse(curUser) as LoggedInUser;
  } catch {
    return null;
  }
};
