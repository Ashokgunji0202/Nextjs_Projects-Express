import { Cart } from "@/components/cart";
import Link from "next/link";

export default function ArchivedNotification() {
    return (
        <Cart>
        <div>Archived Notification</div>
        <div><Link href="/complex-dashboard">Default</Link></div>
        </Cart>
    )
}