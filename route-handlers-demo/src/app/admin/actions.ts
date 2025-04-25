"use server"

import { auth ,clerkClient} from "@clerk/nextjs/server";
import { Roles } from "../../../types/globals";
import { revalidatePath } from "next/cache";
export async function setRole(formData: FormData) {

    const {sessionClaims} = await auth();
    if(sessionClaims?.metadata?.role !== "admin"){
        throw new Error("You are not an admin");
    }

    const client =await clerkClient();
    const userId = formData.get("userId") as string;
    const role = formData.get("role") as Roles;
    try{
        await client.users.updateUser(userId, {
            publicMetadata: {
              role,
            },
          });
          revalidatePath("/admin");
    }
    catch(error){
        throw new Error("Something went wrong");
    }
    
}