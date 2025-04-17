import { User } from "@prisma/client";   //.//models/user.ts
import { Express } from "express";


declare module "express"  {
    interface Request {
        user?: User
    }
}