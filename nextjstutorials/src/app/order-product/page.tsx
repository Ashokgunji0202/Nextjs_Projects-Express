"use client"

import {useRouter} from "next/navigation"
export default async function Page() {
    const router=useRouter()
    const handler=async()=>{
        router.push("/")
    }
    
    return (
        <div>
            <h1>Order product</h1>
            <button onClick={()=>{handler()}}>Home</button>
        </div>
    );
}