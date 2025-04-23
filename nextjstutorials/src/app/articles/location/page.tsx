

export default async function loacationSearch({searchParams}:{
    searchParams:Promise<{location?:string,category?:string}>
}) {

    const location=(await searchParams).location
    const category=(await searchParams).category
    
    return (
        <div>
            <h1>Location page Controller</h1>
            <p>Location: {location}</p>
            <p>Category: {category}</p>
        </div>
    );
}