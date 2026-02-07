function typeAssertion(variable:any){
    if (typeof variable == "undefined"){
        throw Error("Environment variable missing");
    }
    return variable;
}

export const GOOGLE_CLIENT_ID:string = typeAssertion(import.meta.env.VITE_GOOGLE_CLIENT_ID);
export const API_BASE_URL:string = typeAssertion(import.meta.env.VITE_API_BASE_URL);