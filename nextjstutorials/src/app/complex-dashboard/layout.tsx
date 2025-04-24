import { use } from "react";


export default function ComplexDashboard(
    { children,
      revenue,
      notifications,
      users,
      login,
    
     }: 
    { children: React.ReactNode,
      revenue: React.ReactNode,
      notifications: React.ReactNode,
      users: React.ReactNode,
      login: React.ReactNode

     }) {

        const isLoggedIn=true;
    return isLoggedIn ? (
        <>
           <div> {children}</div>
           <div style={{display:"flex"}}>
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                <div>{users}</div>
                <div>{revenue}</div>

            </div>
            <div style={{display:"flex",flex:1}}>{notifications}</div>
           </div>
        </>
    ):(
        <div>{login}</div>
    );
}