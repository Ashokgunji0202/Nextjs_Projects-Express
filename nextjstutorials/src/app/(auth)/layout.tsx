"use client";

import Link from "next/link";
import {usePathname} from "next/navigation"
import "./global.css"

import { useState } from "react";


const navLinks = [
  {name:"Regiser",href:"/register"},
  {name:"Login",href:"/login"},
  {name:"forgotpassword",href:"/forgotpassword"},
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname=usePathname();
  const[username,setUsername]=useState("");
  return (
    
        <div>
          <input type="text"value={username} placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
          <br />
          
        {navLinks.map((link)=>{
          const isActive=pathname===link.href || (pathname.startsWith(`${link.href}`) && link.href!=='/');
          return(
            <Link style={isActive?{color:"black",fontWeight:"bold",textDecoration:"none",marginRight:"7px"}:{color:"blue",fontWeight:"bold",textDecoration:"none",marginRight:"7px"}} href={link.href} key={link.name}>{link.name} </Link>
          )
        })}
        
        {children}
        </div> 
      
  );
}
