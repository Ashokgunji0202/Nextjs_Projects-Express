
import Counter from "./Counter";

export const metadata = {
    title: "Counter",
}

export default function CounterPage() {
    return (
        <div>
            <h1>Counter</h1>
            <Counter />
        </div>
    );
}