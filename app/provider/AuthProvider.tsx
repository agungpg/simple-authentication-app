import { User } from '@models/user';
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { signUp as userSignup } from "../services/signup";
import { login as userLogin } from "../services/login";
import { logout as userLogout } from "../services/logout";
import { getUserLogin } from 'app/services/getUserLogin';
type Profile = Omit<User, "password">
type LoginParam = Omit<User, "name">
type AuthContextType = {
    isLoading: boolean;
    isLogedIn: boolean;
    profile: Profile | undefined;
    login: (param: LoginParam) => Promise<{error: string}>;
    logout: () => void;
    signUp: (user: User) => Promise<{error: string}>;
}

export const AuthContext = createContext<AuthContextType>({
    isLoading: false,
    isLogedIn: false,
    profile: undefined,
    login: (param: LoginParam) => Promise.resolve({error: ""}),
    logout: () => {},
    signUp: (param: User) => Promise.resolve({error: ""})
}); 

function AuthProvider({
    children
}: {
    children: ReactNode
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogedIn, setIsLogedin] = useState(false);
  const [profile, setProfile] = useState<Profile | undefined>(undefined)

  useEffect(() => {
    const checkLogin = () => {
      setIsLoading(true)
      getUserLogin().then((user) => {
        if(user) {
          setIsLogedin(true)
          setProfile(user)
        }
      }).finally(() => {
        setIsLoading(false)
      })
    }
    checkLogin()
  }, [])

  const login = useCallback(async (user: LoginParam) => {
    console.log("login is call")
    const {data, error} = await userLogin(user);
    console.log({data, error})
    if(data && !error) {
      setIsLogedin(true)
      setProfile({
        name: data.name,
        email: data.email
      })
    }
    
    return {
      error: error
    }
  }, [])

  const logout = useCallback(async () => {
    console.log("logout")
    const res = await userLogout()
    if(res) {
      setIsLogedin(false)
      setProfile(undefined)
    }
  }, [])

  const signUp = useCallback(async (user:User) => {
    const res = await userSignup(user)
    return res; 
  }, [])

  const value: AuthContextType = useMemo(() => ({
    isLoading,
    isLogedIn,
    profile,
    login,
    logout,
    signUp
  }), [isLoading, isLogedIn, profile, login, logout, signUp])

  return (
    <AuthContext.Provider 
    value={{
    isLoading,
    isLogedIn,
    profile,
    login,
    logout,
    signUp
  }}>
        {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider
