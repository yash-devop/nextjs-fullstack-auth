// import {} from "@/"
import connect from "@/dbconfig/dbConfig";
import UserModel from "@/models/UserModel";
import { NextRequest , NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

connect()  //connection of the mongodb that we created in dbconfig.ts


export async function GET() {
    try {
        const resp = NextResponse.json({ //response.
            message: "Log out successfull"
        })
        resp.cookies.set("token","")
        return resp;
    } catch (err:any) {
        return NextResponse.json({error:err.message , success: true})
    }
}