import { useUser } from "../hooks/useUser";
import { logout, refreshToken } from "./apiServer";
import { apiServer, tokenStore } from "./axios";

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
    (res) =>res,
    async (error)=>{
        const originalRequest = error.config;
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
        }

        isRefreshing = true;
        try{
            const newToken = await refreshToken();
            tokenStore.set(newToken);
            queueProcesser(null,newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            return apiServer(originalRequest);
        }catch(err){
            queueProcesser(err,null);
            if (originalRequest.url.includes("/auth/refresh")){
                const {logout} = useUser();
                logout();
                return Promise.reject(err);
            }
            return Promise.reject(err);
        }finally{
            isRefreshing = false;
        }
    }
)