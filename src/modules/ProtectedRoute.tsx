import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useEffect } from 'react';
import { validateAccessToken } from '../apis/apiServer';

const ProtectedRoute = () => {
  const {accessToken,setStatus,status} = useUser();
  useEffect(()=>{
    const validateMe = async ()=>{
      setStatus("loading")
      if(!accessToken){
        setStatus("unauthorized");
        return;
      }
      else{
        try{
          const code = await validateAccessToken();
          code === 200? 
          setStatus("authorized"):
          code == 401?
            setStatus("unauthorized"):
            setStatus("error");
        }catch{
          setStatus("unauthorized");
        }
        
      }
    }
    validateMe();
  },[accessToken]);

  useEffect(()=>{
    console.log("status: ",status);
    return ()=>{
      console.log("status: ",status)
    }
  },[status])

  if (status === "loading") return "loading......";
  if (status === "unauthorized") return <Navigate to="/login" />;
  return <Outlet />;

};

export default ProtectedRoute;