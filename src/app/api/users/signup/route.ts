// import {} from "@/"
import connect from "@/dbconfig/dbConfig";
import UserModel from "@/models/UserModel";
import { NextRequest , NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'


connect()  //connection of the mongodb that we created in dbconfig.ts


export async function POST(request: NextRequest) {
    try {
       const reqBody = await request.json();
       const {username,email,password} = reqBody;

       console.log(reqBody);

       // check if user already exists
       const user = await UserModel.findOne({email}) //{email:email}

       if(user){
            return NextResponse.json({error:"User already exists"},{status:400})
       }

       //hashing the password:

       const secretSalt = await bcryptjs.genSalt(10);
       const hashedPassword = await bcryptjs.hash(password,secretSalt);

       const newUser = new UserModel({
            username,  // username:username
            email,
            password: hashedPassword
       })
       //after creating new user , just for this we have to save the user to the db.

       const savedUser = await newUser.save()
       console.log(savedUser);

       return NextResponse.json({message:"User Created Successfully"},{status:201})
       
       
    } catch (err:any) {
        return NextResponse.json({error:err.message , success: true})
    }
}