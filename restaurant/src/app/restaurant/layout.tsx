import Navbar from "@/components/Navbar";

export default function UsersLayout({ children }: { children: React.ReactNode }) {
    return (
    <div className="sticky top-10 z-50">
        <Navbar/>
        {children}
    </div>
    );
}   