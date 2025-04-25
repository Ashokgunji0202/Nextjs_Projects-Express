"use client";
import { useState } from "react";
import { useAuth,useUser } from "@clerk/nextjs";


export const Counter = () => {  

    const[count,setCount] = useState(0);

    const {userId,sessionId,getToken} = useAuth();
    const {isLoaded,isSignedIn,user} = useUser();
    if(!isLoaded|| !isSignedIn) return null;

    return (
        <div>
            <h1>Counter {count}</h1>
            <button onClick={() => setCount((c) => c + 1)}>Increment</button>

        </div>
    );
}