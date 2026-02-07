import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const Home = ()=>{
    const {accessToken, setAccessToken} = useUser()

    useEffect(()=>{
        const storedToken = localStorage.getItem("access_token");
        if (storedToken){
            setAccessToken(storedToken);
        }
    },[])

    return (
    <div className="flex justify-center items-center h-screen">
        {accessToken ? 
        <h1>User logged in</h1>:
        <Navigate to={"/login"} />
        }
    </div>
    )
}

export default Home;