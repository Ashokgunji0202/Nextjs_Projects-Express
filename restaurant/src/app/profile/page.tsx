import Navbar from "@/components/Navbar";
import UserCard from "@/components/UserCard";


export default function ProfilePage() {
    
  
    return (
      <div>
        <Navbar/>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <UserCard  />
      </div>
      </div>
    );
  }