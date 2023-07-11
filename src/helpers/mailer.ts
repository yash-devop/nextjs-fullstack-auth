import nodemailer from 'nodemailer';
import UserModel from '@/models/UserModel';

import bcryptjs from "bcryptjs"


export const sendEmail=async({email,emailType,userID} : any)=>{
    try {
        //create a hashed token.
        const hashedToken = await bcryptjs.hash(userID.toString(),10);

        if(emailType === "VERIFY"){
            await UserModel.findByIdAndUpdate(userID,{verifyToken: hashedToken , verifyTokenExpiry: Date.now() + 360000})
        }else if(emailType === "RESET"){
            await UserModel.findByIdAndUpdate(userID,{forgotPasswordToken: hashedToken , forgotPasswordTokenExpiry: Date.now() + 360000})
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                // user: process.env.TRANSPORTER_USER!,
                // pass: process.env.TRANSPORTER_PASSWORD!
                user: "465bc5a38a7a09",
                pass: "513ec6f1f5357f"
            }
        })
        const mailOptions={
            from : "nextjstut@gmail.com",
            to: email,
            subject : emailType === "VERIFY" ? "Verify your email" :"Reset your password",
            html: emailType === "VERIFY" ?`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> Verify your email}
            or copy and paste the below link in your browser. 
            <br/> ${process.env.domain}/verifyemail?token=${hashedToken}</p>` 
            : `<p>Click <a href="${process.env.DOMAIN}/changepassword?token=${hashedToken}">here</a> to Reset your password}
            or copy and paste the below link in your browser. 
            <br/> ${process.env.domain}/changepassword?token=${hashedToken}</p>`
        }
        
        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (err:any) {
        throw new Error(err.message);
    }
}