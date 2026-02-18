import { apiServer } from "./axios"

export const googleLogin = async(token:string)=>{
    const res = await apiServer.post("/auth/google",{
        "id_token":token
    })
    return res;
}

export const refreshToken = async()=>{
    const res = await apiServer.post("/auth/refresh",{},{
        withCredentials:true
    })
    return res.data;
}

export const validateAccessToken = async() =>{
    const res = await apiServer.get("/auth/me")
    return res.status;
}