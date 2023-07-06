// import {} from "@/"
import connect from "@/dbconfig/dbConfig";
import UserModel from "@/models/UserModel";
import { NextRequest , NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

connect()  //connection of the mongodb that we created in dbconfig.ts


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;

        const user = await UserModel.findOne({email}) //key and value is email new approach.

        if(!user){
            return NextResponse.json({error:"User does not exist" }, {status:400})
        }

        // check if the password is correct
        const validPassword = await bcryptjs.compare(password,user.password);

        if(!validPassword){
            return NextResponse.json({error:"Invalid Password" }, {status:400})
        }

        // create token data or creating payload
        const tokenData={
            id:user._id,
            username: user.username,
            email:user.email
        }
        //create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})  /* ! means im 100% sure it will come */

        const resp = NextResponse.json({ //response.
            message: "Login Successful"
        })
        resp.cookies.set("token",token,{
            httpOnly:true,
            
        })

        return resp; // returning response
    } catch (err:any) {
        return NextResponse.json({error:err.message , success: true})
    }
}