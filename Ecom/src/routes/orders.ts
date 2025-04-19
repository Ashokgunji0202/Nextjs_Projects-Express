import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { cancleOrder, createOrder, getOrderById, listOrders } from "../controllers/orders";
import { errorHandler } from "../error-handler";

const orderRouter: Router = Router();

orderRouter.post("/",[authMiddleware],errorHandler(createOrder));
orderRouter.get("/",[authMiddleware],errorHandler(listOrders));
orderRouter.put("/:id/cancel",[authMiddleware],errorHandler(cancleOrder));
orderRouter.get("/:id",[authMiddleware],errorHandler(getOrderById));

export default orderRouter;