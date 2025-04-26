
// This constant enforces static behavior in the application
export const dynamic = 'force-static';

// This constant sets the revalidation interval to 10 seconds
//export const revalidate = 10;


export async function GET() {

    return  Response.json({time:new Date().toLocaleTimeString()});
}