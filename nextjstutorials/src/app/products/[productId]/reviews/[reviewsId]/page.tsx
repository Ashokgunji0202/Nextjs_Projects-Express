
function generateRandomId(count: number): string {
        return Math.floor(Math.random() * count).toString();
    }


export default async function ReviewPage({ params }: {
    params:Promise< { productId: string, reviewsId: string }>
}) {
    const ids=generateRandomId(2);
    if(ids==="1") throw new Error("Error for random id")
    const {productId,reviewsId}= await params
    const id=Math.random();

    return (
        <div>
            <h1>Review page</h1>
            <h2>Produts {productId}</h2>
            <h2>reviews By Id {reviewsId}</h2>
        </div>
    );  

    
}