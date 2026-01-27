import { LoginPayload, LoginResult } from "@type/auth";
import { findUserByEmail } from "./getUsers";
import { STORAGE_KEYS, storeData } from "@storage/index";

export const login = async (payload: LoginPayload): Promise<LoginResult> => {
  const user = await findUserByEmail(payload.email);
  if (!user) {
    return { data: null, error: "User is not register yet!" };
  }

  if (user.password !== payload.password) {
    return { data: null, error: "Wrong password!" };
  }

  await storeData(
    STORAGE_KEYS.CURRENT_USER,
    JSON.stringify({ name: user.name, email: user.email })
  );

  return { data: user, error: "" };
};
