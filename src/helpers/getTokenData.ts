import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";


export const getTokenData=(request : NextRequest)=>{
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!)
        console.log('decodedTokkens',decodedToken); 
        return decodedToken.id;  
    } catch (err:any) {
        throw new Error(err.message)
    }
}