import { STORAGE_KEYS, storeData } from "@storage/index";
import { findUserByEmail, getUsers } from "./getUsers";
import type { User } from "@type/user";
import type { SignUpResult } from "@type/auth";

export const signUp = async (payload: User): Promise<SignUpResult> => {
  try {
    const userList = await getUsers();
    const existingUser = await findUserByEmail(payload.email);

    if (existingUser) {
      throw new Error("Email is taken already, please use another email!");
    }

    const newUserList = [...userList, payload];

    const isSuccess = await storeData(
      STORAGE_KEYS.USERS_LIST,
      JSON.stringify(newUserList)
    );

    return { error: isSuccess ? "" : "Opps something went wrong" };
  } catch (error) {
    return { error: error?.toString() ?? "Opps something went wrong" };
  }
};
