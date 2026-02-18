import type { QueryClient } from "@tanstack/react-query";
import { tokenStore } from "../apis/axios";

let queryClient:QueryClient| null = null;
let resetAuthState: (()=>void) | null = null;

export const registerAuthHandlers = (qc: QueryClient,resetFunction:()=>void)=>{
    queryClient = qc;
    resetAuthState = resetFunction;
}

export const logout = async()=>{
    if(resetAuthState) resetAuthState();
    if(queryClient){
        queryClient.cancelQueries();
        queryClient.clear();
    }
    await tokenStore.clear();
}