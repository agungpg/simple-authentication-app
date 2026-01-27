import { getData, STORAGE_KEYS } from "@storage";
import type { User } from "@type/user";

const parseUsers = (raw: string | null | undefined): User[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const getUsers = async (): Promise<User[]> => {
  const userListStr = await getData(STORAGE_KEYS.USERS_LIST);
  return parseUsers(userListStr);
};

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  const normalizedEmail = email.trim().toLowerCase();
  const userList = await getUsers();
  return userList.find((usr) => usr.email.trim().toLowerCase() === normalizedEmail);
};
