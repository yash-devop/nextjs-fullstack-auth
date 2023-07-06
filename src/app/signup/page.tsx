"use client";  // we are making it the clientside component

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";  //new nextjs 13.4 update syntax
import axios from "axios";
import { toast ,Toaster} from "react-hot-toast";


export default function SignUp() {
    const router = useRouter();
    const [buttonDisabled , setButtonDisabled] = React.useState(false);
    const [loading , setLoading] = React.useState(false);
    const [user, setUser] = React.useState({
        username:"",
        email:"",
        password:""
    })

    const onSignup = async()=>{
        try {
            const response = await axios.post('/api/users/signup',user)
            console.log('response',response.data);
            toast.success("Registered successfully !")
            setInterval(()=>{
                router.push('/login')
            },3000)
        } catch (err:any) {
            notify(err);
            console.log(err)
        }

    }
    const notify=(err:any)=>{
        toast(err || "Something went wrong!")
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
            
        }
    },[user])

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>Signup</h1>
                <hr />
                <label htmlFor="username">username</label>
                <input type="text" name="username" className="h-10 px-4 text-black rounded-lg focus:outline-none" placeholder="Username" value={user.username} onChange={(e)=>setUser({...user, username: e.target.value})} />
                <label htmlFor="email">email</label>
                <input type="email" name="email" className="h-10 px-4 text-black rounded-lg focus:outline-none" placeholder="Email" value={user.email} onChange={(e)=>setUser({...user, email: e.target.value})} />
                <label htmlFor="password">password</label>
                <input type="password" name="password" className="h-10 px-4 text-black rounded-lg focus:outline-none" placeholder="Password" value={user.password} onChange={(e)=>setUser({...user, password: e.target.value})} />

                {
                    buttonDisabled ? (
                        <>
                            <button className="bg-[#1a1919a6] text-white text-base px-1 mt-3 rounded-[4px] h-[50px] w-[200px] font-medium border-solid border cursor-pointer transition-all duration-100">
                                Sign up
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={onSignup} className="text-base px-1 mt-3 rounded-[4px] h-[50px] w-[200px] font-medium border-solid border cursor-pointer bg-[#132734] text-blue-700 border-1 border-inset border-blue-400 transition-all duration-100">
                                Sign up
                            </button>
                        </>
                    )
                }
                <Link href={"/login"} className="p-4 border mt-3">Visit Login Page</Link>
                <Toaster/>
            </div>
        </>
    );    
};
