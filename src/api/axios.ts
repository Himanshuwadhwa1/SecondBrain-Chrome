import axios from "axios";
import { API_BASE_URL } from "../utils/env";

export const apiServer = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
})

let accesstoken:string|null = null;

export const tokenStore = {
    get: ()=>accesstoken,
    set: (token:string)=>{
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

apiServer.interceptors.response.use(
  res => res,
  async error => {
    if (error.response?.status === 401) {
      // call refresh
      // retry original request
    }
    return Promise.reject(error);
  }
);