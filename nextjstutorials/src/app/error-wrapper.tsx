"use client"

import "./globals.css"

import { useState } from "react"    

interface WrapperProps {
    children: React.ReactNode
}

const ErrorSimulation =({
    message="something went wrong",
}:{message?:string})=>{
    const[error,setError]=useState(false)

    if(error){
        throw new Error(message);
    }
    return(
        <button title="Simulate Error"
          className="bg-red-500 text-black-500 rounded p-1 leading-none font-semibold text-co"  
          onClick={() => setError(true)}>Some things</button>
    )
    
}

export default function ErrorWrapper({children}:WrapperProps) {
  return (
    <div className="flex flex-col rounded-lg mt-8 relative p-4 boarder boarder-gray-300">
        <div className="absolute top-0 left-4 -translate-y-1/2 bg-white ">
          <ErrorSimulation message="Simulate Error in root layout" />
        </div>
        {children}
    </div>
  )
}