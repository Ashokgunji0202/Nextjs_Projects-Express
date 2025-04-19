export default function Profile({ params }:
     { params: { id: any } }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">profile page <span className="p-2 ml-2 rounded bg-orange-400 text-black">{params.id}</span>a</p>
        </div>
    )
}