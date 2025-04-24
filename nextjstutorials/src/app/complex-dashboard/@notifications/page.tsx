import { Cart } from "@/components/cart";
import Link from "next/link";

export default function Notification() {
    return <Cart>
        <div>Notification</div>
        <div><Link href="/complex-dashboard/archived">Archived</Link></div>
        </Cart>
}