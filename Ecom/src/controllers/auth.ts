import { NextFunction, Request, Response } from "express";
import { prisma } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCodes } from "../exceptions/root";
import { SignUpSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";
dotenv.config({ path: ".env" });


export const signup = async (req: Request, res: Response, next: NextFunction) => {
    SignUpSchema.parse(req.body);
    const { email, password, name } = req.body;

    let user = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (user) {
        throw new BadRequestsException("User already exists", ErrorCodes.USER_ALREADY_EXISTS);
    }
    user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10)
        }
    });
    res.json(user);
}

export const login = async (req: Request, res: Response,next: NextFunction) => {
    const { email, password } = req.body;

    let user = await prisma.user.findFirst({
        where: {
            email
        }
    });
    if (!user) {
        
        throw new NotFoundException("User not found", ErrorCodes.USER_ALREADY_EXISTS);
    }
    else if(!compareSync(password, user.password)) {
        console.log(user.password)
        throw new NotFoundException("User not found", ErrorCodes.USER_ALREADY_EXISTS);
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "7h" });	
    res.json({ user, token });

};