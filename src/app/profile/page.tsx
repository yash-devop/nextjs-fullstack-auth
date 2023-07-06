"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";  //new nextjs 13.4 update syntax
import axios from "axios";
import {toast , Toaster} from 'react-hot-toast'

export default function UserProfile({params}:any) {
    const router = useRouter();
    const handleLogout=async()=>{
        try {
            await axios.post('/api/users/logout')
            toast.success("Log out successful !")
            setInterval(()=>{
                router.push('/login')
            },2000)
        } catch (err:any) {
            notify(err);
            console.log(err)
        }
    }
    
    const notify=(err:any)=>{
        toast(err || "Login failed ! ")
    }

    return(
        <>
            <div className="flex flex-col justify-center items-center min-h-screen py-2">
                <h1>Profile</h1>
                <p>Profile Page {params?.id}</p>
                <button onClick={handleLogout} className="text-base px-1 mt-3 rounded-[4px] h-[50px] w-[200px] font-medium border-solid border cursor-pointer bg-[#341313] text-[#8f3434] border-1 border-inset border-red-400">Logout</button>
            </div>
        </>
    )
};
