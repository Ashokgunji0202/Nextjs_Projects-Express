
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";

import { addAddress, deleteAddress, listAddress, updateUser } from "../controllers/user";
import { errorHandler } from "../error-handler";



const usersRouter: Router = Router();


usersRouter.get("/address",[authMiddleware],errorHandler(listAddress));
usersRouter.post("/address",[authMiddleware],errorHandler(addAddress));
usersRouter.delete("/address/:id",[authMiddleware],errorHandler(deleteAddress));
usersRouter.put("/",[authMiddleware],errorHandler(updateUser));


export default usersRouter;
