import Button from "../components/Button"
import { GOOGLE_CLIENT_ID } from "../utils/env";
import { googleLogin } from "../apis/apiServer";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";


const Login = () => {
  const {status,setStatus,setUser,setAccessToken} = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    setStatus("loading");
    const REDIRECT_URL = chrome.identity.getRedirectURL();
    
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    console.log("REDIRECT_URL",REDIRECT_URL);
    
    authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
    authUrl.searchParams.set('response_type', 'id_token');
    authUrl.searchParams.set('redirect_uri', REDIRECT_URL);
    authUrl.searchParams.set('scope', 'openid email profile');
    authUrl.searchParams.set('nonce', crypto.randomUUID());

    chrome.identity.launchWebAuthFlow({
        url: authUrl.href,
        interactive: true
    }, async(responseUrl) => {
        if (chrome.runtime.lastError || !responseUrl) {
        console.error(chrome.runtime.lastError);
        setStatus("error");
        return;
        }

        // Extract the id_token from the URL hash
        const url = new URL(responseUrl.replace('#', '?'));
        const idToken = url.searchParams.get('id_token');
        if (!idToken){
          alert("Some error occured, Please try again later");
          setStatus("unauthorized");
          return;
        }
        try{
          const response = await googleLogin(idToken);
          const data = await response.data;
          const accessToken = data?.access_token;
          console.log("accessToken from login:",accessToken);
          const userInfo = data?.user;
          if (accessToken && userInfo){
            setStatus("authorized");
            setAccessToken(accessToken);
            setUser(userInfo);
            await chrome.storage.local.set({"accessToken":accessToken});
            navigate("/protected");
          }else{
            setStatus("unauthorized");
          }
        }catch(err){
          setStatus("error")
          alert("error");
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