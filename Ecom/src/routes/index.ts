import { Router } from "express";
import  authRouter  from "./auth";
import productRouter from "./products";
import usersRouter from "./users";
const rootRouter: Router = Router();

rootRouter.use("/auth",authRouter);
rootRouter.use("/products",productRouter);
rootRouter.use("/users",usersRouter);


export default rootRouter;