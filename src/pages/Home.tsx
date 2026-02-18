import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import Button from "../components/Button";
import { tokenStore } from "../apis/axios";

const Home = () => {
    const { accessToken, setAccessToken } = useUser();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchToken = async () => {
            try {
                if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
                    const token = await tokenStore.get()
                    if (token && typeof token =="string") {
                        setAccessToken(token);
                        await tokenStore.set(token);
                    }
                }
            } catch (error) {
                console.error("Error accessing chrome storage:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchToken();
    }, [accessToken]);

    if (isLoading) return <div>Loading......................</div>;

    return (
        <div className="flex justify-center items-center h-screen">
            {accessToken ? (
                <Button onClick={() => navigate("/protected")}>Chat</Button>
            ) : (
                <Navigate to="/login" replace />
            )
            }
        </div>
    );
};

export default Home;