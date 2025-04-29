import ItemsComponent from "@/components/ItemsCart";

interface ItemsComponentProps {
    resId: string;
  }

export default async function RestaurantPage({params}:
     {params:Promise< {restaurantId: string}>}

    ) {    
    const restId=(await params).restaurantId
    return (
        <div>
            <ItemsComponent resId={restId}/>
        </div>
    );
}