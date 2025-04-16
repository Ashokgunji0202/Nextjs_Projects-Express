import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
export const adminMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        next(new UnauthorizedException("User is not an admin", ErrorCodes.UNAUTHORIZED));
    }
}