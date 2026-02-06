import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Home = ()=>{
    const [token,setToken] = useState<string|null>(null)

    useEffect(()=>{
        const storedToken = localStorage.getItem("access_token");
        if (storedToken){
            setToken(storedToken);
        }
    },[])

    return (
    <div className="flex justify-center items-center h-screen">
        {token ? 
        <h1>User logged in</h1>:
        <Navigate to={"/login"} />
        }
    </div>
    )
}

export default Home;