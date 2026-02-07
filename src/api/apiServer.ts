import { apiServer } from "./axios"

export const googleLogin = async(token:string)=>{
    const res = await apiServer.post("/auth/google",{
        "id_token":token
    })
    return res.data;
}

export const refreshToken = async()=>{
    const res = await apiServer.post("/auth/refresh",{},{
        withCredentials:true
    })
    return res.data;
}

export const logout = async()=>{
    const res = await apiServer.post("/auth/logout",{},{
        withCredentials:true
    })
    return res.data;
}