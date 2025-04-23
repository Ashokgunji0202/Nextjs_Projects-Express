import Link from "next/link";

export default function Page() {
    return (
        <>
        <Link href="/">Home page</Link>
        <h1>Product page</h1>
        <h2><Link href={"/products/1"}>Product 1</Link></h2>
        <h2><Link href={"/products/2"}> Product 2</Link></h2>
        <h2><Link href={"/products/3"}>Product 3</Link></h2>
        
        </>
    );
}