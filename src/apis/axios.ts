import axios from "axios";
import { API_BASE_URL } from "../utils/env";
import { refreshToken } from "./apiServer";
import { logout } from "../services/authService";

export const apiServer = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
})

export const tokenStore = {
    async get(): Promise<string | null> {
        const result = await chrome.storage.local.get<{accessToken ?: string}>("accessToken")
        return result.accessToken ?? null
    },
    async set(token: string | null): Promise<void> {
        if (token === null) {
        await chrome.storage.local.remove("accessToken")
        } else {
        await chrome.storage.local.set({ "accessToken": token })
        }
    },
    async clear(): Promise<void> {
        await chrome.storage.local.remove("accessToken")
    }
}

apiServer.interceptors.request.use(async(config)=>{
    const token =await tokenStore.get();
    if (token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
})

// response handling even for refresh logic

let isRefreshing = false;

let failedQueue:{
    resolve:(token:string)=>void;
    reject:(error:any)=>void;
}[] = []

const queueProcesser = (err:any,token:string|null)=>{
    failedQueue.forEach(promise =>{
        if (err) promise.reject(err);
        else promise.resolve(token!);
    });
    failedQueue = [];
}

apiServer.interceptors.response.use(
    (res) => res,
    async (error)=>{
        const originalRequest = error.config;
        if(!originalRequest) return Promise.reject(error);

        if (originalRequest.url.includes("/auth/refresh")){
            logout();
            return Promise.reject(error);
        }

        if (error.response?.status != 401) return Promise.reject(error);
        if(originalRequest._retry) return Promise.reject(error);

        if(error.response?.status == 401 && !originalRequest._retry){
            originalRequest._retry= true;
            if(isRefreshing){
                return new Promise((resolve,reject)=>{
                    failedQueue.push({
                        resolve: (token:string)=>{
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(apiServer(originalRequest));
                    },
                    reject
                    });
                })
            }
            else{
                isRefreshing = true;
                try{
                    const newToken = await refreshToken();
                    await tokenStore.set(newToken.access_token);
                    queueProcesser(null,newToken);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`
                    return apiServer(originalRequest);
                }catch(err){
                    queueProcesser(err,null);
                    return Promise.reject(err);
                }finally{
                    isRefreshing = false;
                }
            }
        }
        return Promise.reject(error);
    }
)