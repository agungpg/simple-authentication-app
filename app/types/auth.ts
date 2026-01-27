import { User } from "./user";

export type Profile = Omit<User, "password">;

export type LoginParam = Omit<User, "name">;
export type LoginPayload = LoginParam;

export type AuthContextType = {
  isLoading: boolean;
  isLogedIn: boolean;
  profile: Profile | undefined;
  login: (param: LoginParam) => Promise<{ error: string }>;
  logout: () => void;
  signUp: (user: User) => Promise<{ error: string }>;
};

export type LoginResult = { data: User | null; error: string };
export type SignUpResult = { error: string };

export type LoggedInUser = Pick<User, "name" | "email">;
