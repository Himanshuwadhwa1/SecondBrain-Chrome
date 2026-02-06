import { createContext, useState, type ReactNode } from "react";

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
    setUser : React.Dispatch<React.SetStateAction<User|null>>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({children}: {children:ReactNode})=>{
    const [user, setUser] = useState<User | null>(null)
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const values = {
        user,
        accessToken,
        setUser,
        setAccessToken
    }
        
    return (
    <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
    )
}