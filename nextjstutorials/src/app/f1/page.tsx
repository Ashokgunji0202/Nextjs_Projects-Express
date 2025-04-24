import Link from "next/link";

export default function F1Page() {
    return (
        <div>
            <h1>First page f1</h1>
            <br />
            <div>
                <Link href="/f1/f2">Second page</Link>
            </div>
            <br />
            <div>
                <Link href="/f3">Third page</Link>
            </div>
        </div>
    );
}