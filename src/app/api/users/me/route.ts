import connect from "@/dbconfig/dbConfig";
import { getTokenData } from "@/helpers/getTokenData";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request:NextRequest) {
    try {
        const userID = await getTokenData(request);
        const user = await UserModel.findOne({_id:userID}).select("-password")  //.select("-password") means i dont want and select("password") means i want.
        
        return NextResponse.json({
            message: "User Found",
            data: user
        })

    } catch (err:any) {
        return NextResponse.json({error: err.message},{status:400})
    }
}
