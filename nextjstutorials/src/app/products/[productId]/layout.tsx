

export default function Layout(
    { children }: 
    { children: React.ReactNode }) 
    {
    return (
        <div>
            <h1>Product Layout for layout page</h1>
            {children}
        </div>
    );

    
}