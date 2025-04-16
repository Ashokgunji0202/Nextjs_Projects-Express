import { Request, Response } from "express";
import { prisma } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
export const createProduct = async (req: Request, res: Response) => {
    const product= await prisma.product.create({
       
        //create a validator to for this request
        data:{
            ...req.body,
            tags: req.body.tags.join(",")
        }});
        res.json(product);

}
export const updateProduct = async (req: Request, res: Response) => {
    try{
        const product=req.body;
        if(product.tags){
            product.tags=product.tags.join(",");
        }
        const updatedProduct=await prisma.product.update({
            where:{id:+req.params.id},// interger
            data:product
        });
        res.json(updatedProduct);

    }
    catch(error){
        console.log(error)
        throw new NotFoundException("Product not found", ErrorCodes.NOT_FOUND);
    }  
}
export const deleteProduct = async (req: Request, res: Response) => {
    try{
        const deletedProduct=await prisma.product.delete({
            where:{id:+req.params.id},// interger
        });
        res.json(deletedProduct);
    }catch(error){
        console.log(error)
        throw new NotFoundException("Product not found", ErrorCodes.NOT_FOUND);
      
}
}
export const listProducts = async (req: Request, res: Response) => {
    try{
        const products=await prisma.product.findMany();
        res.json(products);
    }catch(error){
        console.log(error)
        throw new NotFoundException("Product not found", ErrorCodes.NOT_FOUND);
    }    
      
}

export const getProductById = async (req: Request, res: Response) => {
    try{
        const product=await prisma.product.findUnique({
            where:{id:+req.params.id},// interger
        });
        res.json(product);
    }catch(error){
        console.log(error)
        throw new NotFoundException("Product not found", ErrorCodes.NOT_FOUND);
      
    }
      
}