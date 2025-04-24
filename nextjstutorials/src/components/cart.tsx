// adding cart component
export const Cart = ({children}:{children:React.ReactNode}) => {
    const cartStyle={
        padding:"100px",
        margin:"10px",
        boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)",
        border:"1px solid #ddd",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"

    }
    return(<div style={cartStyle}>{children}</div>)

}
