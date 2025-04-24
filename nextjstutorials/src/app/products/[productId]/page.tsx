
import { Metadata } from "next";

type Props = {
    params: Promise<{ productId: string }>
};

//Handling Error in layout pages
function generateRandomId(count: number): string {
    return Math.floor(Math.random() * count).toString();
} 

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
    const ids=generateRandomId(2);
    if(ids==="1") throw new Error("Error for random product Id");
    return (

        <h1>Details of the product by {productId}</h1>

    );

}

