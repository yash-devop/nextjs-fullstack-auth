"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"


export default function VerifyEmailPage(){
    const [token , setToken] = useState(""); 
    const [verified, setVerified] = useState(false); 
    const [error, setError] = useState(false); 

    const verifyUserEmail=async()=>{


        try {
            axios.post('/api/users/verifyemail',{token});
            setVerified(true)
        } catch (err) {
            setError(true);
            console.log(err);
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || ""); 
    },[])



    useEffect(()=>{
        if(token.length > 0){
            verifyUserEmail();
        }
    },[token])


    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-4xl">Verify your Email</h1>
                <h2 className="p-2 bg-blue-400 text-black">{token ? `${token}` : "no token"}</h2>
            
                {
                    verified && (
                        <>
                            <div>
                                <h2 className="text-2xl">Email verified</h2>
                                <Link href={"/login"}>
                                    <h2 className="text-blue-400">Login</h2>
                                </Link>
                            </div>
                        </>
                    ) 
                }
                {
                    error && (
                        <>
                            <div>
                                <h2 className="text-2xl bg-red-500">Error</h2>
                            </div>
                        </>
                    ) 
                }
            </div>
        </>
    )
}