import { NextFunction, Request, Response } from "express";
import { ErrorCodes } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { prisma } from "..";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // 1. extract token from header
    const authHeader = req.headers.authorization;
    console.log("Authorization header:", authHeader);

    // 2. if token is not present then throw error
    if (!authHeader) {
        throw new UnauthorizedException("Token is not present", ErrorCodes.UNAUTHORIZED);
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.split(" ")[1];
    if (!token) {
        throw new UnauthorizedException("Token format is invalid", ErrorCodes.UNAUTHORIZED);
    }

    try {
        console.log("Entering auth middleware");

        // 3. if token is present then verify token and extract the payload
        const payload = jwt.verify(token, process.env.JWT_SECRET || "secret") as { id: any };
        console.log("payload", payload);

        // 4. to get the user from the payload
        const user = await prisma.user.findUnique({ where: { id: payload.id } });
        if (!user) {
            throw new UnauthorizedException("User not found", ErrorCodes.UNAUTHORIZED);
        }

        // 5. attach the user to the request object
        req.user = user;

        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        next(new UnauthorizedException("Invalid token", ErrorCodes.UNAUTHORIZED));
    }
};
