import { useContext } from "react"
import { AuthContext} from "../contexts/AuthContext"

export function useUser(){
    const context = useContext(AuthContext);
    if (!context){
        throw new Error("useUser must be inside UserProvider")
    }
    return context;
}