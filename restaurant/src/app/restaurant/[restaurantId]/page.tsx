
export default async function RestaurantPage({params}:
     {params:Promise< {restaurantId: string}>}

    ) {    
    const restaurantId=(await params).restaurantId
    return (
        <div>
            <h1>Fetch all restaurants Items {restaurantId}</h1>
        </div>
    );
}