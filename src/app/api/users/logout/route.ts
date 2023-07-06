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
        const resp = NextResponse.json({ //response.
            message: "Log out successfull"
        })
        resp.cookies.set("token","")

    } catch (err:any) {
        return NextResponse.json({error:err.message , success: true})
    }
}