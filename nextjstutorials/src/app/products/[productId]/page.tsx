
import { Metadata } from "next";

type Props = {
    params: Promise<{ productId: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id= (await params).productId

    // inseted of this api call
    const title=await new Promise((resolve) => 
        setTimeout(() => {
            resolve(`Product ${id}`);
        }, 1000)
        );
    return {
        title: `Product ${title}`,
    }
}

export default async function productPage({ params }: Props) {
    const productId = (await params).productId
    return (

        <h1>Details of the product by {productId}</h1>

    );

}

