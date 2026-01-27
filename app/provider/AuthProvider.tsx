import { User } from '@type/user';
import { AuthContextType, LoginParam, Profile } from '@type/auth';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { signUp as userSignup } from "@services/signUp";
import { login as userLogin } from "@services/login";
import { logout as userLogout } from "@services/logout";
import { getUserLogin } from '@services/getUserLogin';

export const AuthContext = createContext<AuthContextType>({
    isLoading: false,
    isLogedIn: false,
    profile: undefined,
    login: (_: LoginParam) => Promise.resolve({error: ""}),
    logout: () => {},
    signUp: (_: User) => Promise.resolve({error: ""})
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
    const checkLogin = async () => {
      setIsLoading(true);
      try {
        const user = await getUserLogin();
        if (user) {
          setIsLogedin(true);
          setProfile(user);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkLogin();
  }, [])

  const login = useCallback(async (user: LoginParam) => {
    const {data, error} = await userLogin(user);

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
