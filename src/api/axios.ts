import axios from "axios";
import { API_BASE_URL } from "../utils/env";

export const apiServer = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
})

let accesstoken:string|null = null;

export const tokenStore = {
    get: ()=>accesstoken,
    set: (token:string|null)=>{
        accesstoken = token
    }
}

apiServer.interceptors.request.use((config)=>{
    const token = tokenStore.get();
    if (token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
})