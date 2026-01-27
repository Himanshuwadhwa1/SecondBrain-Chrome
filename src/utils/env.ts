function typeAssertion(variable:any){
    if (typeof variable == "undefined"){
        throw Error("Environment variable missing");
    }
    return variable;
}

export const GOOGLE_CLIENT_ID:string = typeAssertion(import.meta.env.VITE_GOOGLE_CLIENT_ID);