import Link from "next/link";

// adding the navbarlinks
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
  return (
    <html lang="en">
      <body>
        <div>
        {navLinks.map((link)=>{
          return(
            <Link href={link.href} key={link.name}>{link.name} </Link>
          )
        })}
        </div>
       
        {children}

        
      </body>
    </html>
  );
}
