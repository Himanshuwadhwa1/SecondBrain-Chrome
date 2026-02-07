import { useState } from "react";
import Button from "../components/Button"
import { GOOGLE_CLIENT_ID } from "../utils/env";

type Status = "idle" | "loading" | "authorized" | "unauthorized" | "error"

const Login = () => {
  const [status, setStatus] = useState<Status>("idle");

  const handleLogin = () => {
    setStatus("loading");
    const REDIRECT_URL = chrome.identity.getRedirectURL();
    
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    console.log("REDIRECT_URL",REDIRECT_URL);
    
    authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
    authUrl.searchParams.set('response_type', 'id_token');
    authUrl.searchParams.set('redirect_uri', REDIRECT_URL);
    authUrl.searchParams.set('scope', 'openid email profile');
    authUrl.searchParams.set('nonce', Math.random().toString(36).substring(2));

    chrome.identity.launchWebAuthFlow({
        url: authUrl.href,
        interactive: true
    }, (responseUrl) => {
        if (chrome.runtime.lastError || !responseUrl) {
        console.error(chrome.runtime.lastError);
        return;
        }

        // Extract the id_token from the URL hash
        const url = new URL(responseUrl.replace('#', '?'));
        const idToken = url.searchParams.get('id_token');
        if (!idToken){
          alert("Some error occured, Please try again later");
        }
        
        
        });
    };
    if(status == "loading") return "loading..."

  return (
    <div className="flex justify-center items-center h-screen">
        <Button size="large" variant="primary" onClick={handleLogin}>
            <h1 className="items-center text-4xl">Sign in with Google</h1>
        </Button>
    </div>
  );
};

export default Login;