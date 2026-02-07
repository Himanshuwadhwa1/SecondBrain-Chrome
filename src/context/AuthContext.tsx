import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";
import { tokenStore } from "../api/axios";

type User = {
    userId: string;
    email: string,
    name: string,
    image: string
}

interface AuthContextValue {
    user :User| null,
    accessToken: string | null,
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>,
    setUser : React.Dispatch<React.SetStateAction<User|null>>,
    logout: ()=>void,
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: {children:ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const logout = useCallback(() => {
        setAccessToken(null);
        setUser(null);
        
        queryClient.cancelQueries();
        queryClient.clear();

        tokenStore.set(null);
    },[queryClient]);

    const value = useMemo(
        () => ({
        user,
        accessToken,
        setUser,
        setAccessToken,
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
