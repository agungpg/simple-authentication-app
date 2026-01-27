import { removeData, STORAGE_KEYS } from "@storage"

export const logout = async (): Promise<boolean> => {
  try {
    const res = await removeData(STORAGE_KEYS.CURRENT_USER);
    return res;
  } catch(e) {
    console.log(e)
    return false;
  }
}
