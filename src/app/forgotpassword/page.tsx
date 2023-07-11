"use client"

import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { sendEmail } from "@/helpers/mailer";

export default  function ForgotPassword(){
    const [user, setUser] = React.useState({
        email:"",
    })
    const HandleSendForgotPassEmail=async()=>{
        axios.post('/api/users/forgotpassword',user)
    } 
    
    return(
        <>
            <div className="">
                <h1>Forgot Password ? </h1>
                <p>First enter your mail and we will send you an Email to change the password.</p>
                <input type="email" name="email" placeholder="Enter your email" className="p-4 text-black" value={user.email} onChange={(e)=>setUser({...user, email: e.target.value})}/>
                <button className="p-4 bg-green-900 text-green-500" onClick={HandleSendForgotPassEmail}>Send Email</button>
            </div>
        </>
    )
}