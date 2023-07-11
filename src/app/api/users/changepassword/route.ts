import connect from "@/dbconfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();

        const {token,password} = reqBody;
        
        const user = await UserModel.findOne({forgotPasswordToken : token })


        //hashing the password:
       const secretSalt = await bcryptjs.genSalt(10);
       const hashedPassword = await bcryptjs.hash(password,secretSalt);

       const updatedUser = await UserModel.findByIdAndUpdate(user._id,{password:hashedPassword})

        return NextResponse.json({
            message: "ForgetPassword worked",
            success : true
        })
        


    } catch (err:any) {
        return NextResponse.json({error:err.message},{status:400})
    }
}