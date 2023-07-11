"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function ChangePassword(){
    const router = useRouter();
    const [isCorrect , setIsCorrect] = useState(false);
    const [password,setPassword] = useState<any>(null);
    const [confirmPassword,SetConfirmPassword] = useState<any>(null);
    const [token , setToken ] = useState("");

    const PasswordsHandler=(e: React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        setPassword(e.target.value);
    }
    const confirmPasswordHandler=(e: React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        SetConfirmPassword(e.target.value);
    }

    const handleForgotPassword=()=>{
        try {
            axios.post('/api/users/changepassword',{token,password:confirmPassword});
            router.push('/login')
        } catch (err) {
            console.log(err);
        }
    }
    

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || ""); 
    },[])

    useEffect(()=>{
        if(token.length > 0){
            handleForgotPassword();         
        }
    },[token])
    // if(password === confirmPassword){
    //     setIsCorrect(true);
    // }
    // else{
    //     setIsCorrect(false);
    // }
    return(
        <>
            <div className="flex items-center justify-center min-h-screen">
                <input type="text"  className="p-3 text-black"placeholder="Enter new your password" value={password} onChange={PasswordsHandler} />
                <input type="text" className="p-3 ml-2 text-black" placeholder="Confirm your Password" value={confirmPassword} onChange={confirmPasswordHandler} />
                <button className="p-3 ml-2 bg-blue-950 text-blue-700" onClick={handleForgotPassword}>Change Password</button>
                {/* <p className={isCorrect ? `text-green-600` : `text-red-400`}>{isCorrect ? "Password is correct" : "Password doesn't match"}</p> */}
            </div>
        </>
    )
}