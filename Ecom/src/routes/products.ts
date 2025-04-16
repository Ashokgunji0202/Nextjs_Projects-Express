
import {Router} from "express";
import { errorHandler } from "../error-handler";
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from "../controllers/products";
import { authMiddleware } from "../middlewares/auth";

import { adminMiddleware } from "../middlewares/admin";


const productRouters: Router = Router();

productRouters.post("/",[authMiddleware,adminMiddleware],errorHandler(createProduct));
productRouters.get("/allproducts",[authMiddleware,adminMiddleware],errorHandler(listProducts));
productRouters.get("/:id",[authMiddleware,adminMiddleware],errorHandler(getProductById));

productRouters.put("/:id",[authMiddleware,adminMiddleware],errorHandler(updateProduct));
productRouters.delete("/:id",[authMiddleware,adminMiddleware],errorHandler(deleteProduct));

export default productRouters;
