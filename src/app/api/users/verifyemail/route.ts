import connect from "@/dbconfig/dbConfig";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();

        const {token} = reqBody;

        const user = await UserModel.findOne({verifyToken : token , verifyTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json({error:"Invalid token"},{status:400})
        }



        const saved = await user.save();



        return NextResponse.json({
            message: "Email Verified",
            success : true
        })

    } catch (err:any) {
        return NextResponse.json({error:err.message},{status:500})
    }
}