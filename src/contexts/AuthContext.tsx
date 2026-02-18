import { useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { logout, registerAuthHandlers } from "../services/authService";

export type User = {
    id: string;
    email: string,
    name: string,
    image: string
}

export type Status = "loading" | "authorized" | "unauthorized" | "error";

interface AuthContextValue {
    user :User| null,
    accessToken: string | null,
    status:Status | null;
    setStatus: React.Dispatch<React.SetStateAction<Status|null>>
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>,
    setUser : React.Dispatch<React.SetStateAction<User|null>>,
    logout: ()=>void,
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: {children:ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [status,setStatus] = useState<Status|null>(null);
    const queryClient = useQueryClient();

    const resetAuthState = useCallback(()=>{
      setAccessToken(null);
      setUser(null);
      setStatus("unauthorized");
    },[]);

    useEffect(()=>{
      registerAuthHandlers(queryClient,resetAuthState);
    },[queryClient,resetAuthState]);

    const value = useMemo(
        () => ({
        user,
        accessToken,
        setUser,
        setAccessToken,
        status,
        setStatus,
        logout,
    }),
    [user, accessToken]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
