import connect from "@/dbconfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request:NextRequest){
    try {

        const reqBody = await request.json();
        const {email,token} = reqBody;
        
        const user = await UserModel.findOne({email : email})

        if(!user){
            return NextResponse.json({error:"Invalid token"},{status:400})
        }

        await sendEmail({email, emailType:"RESET",userID:user._id})
        return NextResponse.json({
            message: "ForgotPassword works",
            success : true,
            user : user
        })

    } catch (err:any) {
        return NextResponse.json({error:err.message},{status:400})
    }
}