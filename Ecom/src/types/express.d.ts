import { User } from "@prisma/client";
import { Express } from "express";


declare module "express"  {
    interface Request {
        user?: User
    }
}