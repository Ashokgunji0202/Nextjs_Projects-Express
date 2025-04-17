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


export const signup = async (req: Request, res: Response) => {
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

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    let user = await prisma.user.findFirst({
        where: {
            email
        }
    });
    if (!user) {
        
        throw new NotFoundException("User not found", ErrorCodes.USER_ALREADY_EXISTS);
    }
    if(!compareSync(password, user.password)) {
        console.log(user.password)
        throw new BadRequestsException("Incorrect password", ErrorCodes.USER_ALREADY_EXISTS);
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret");	
    res.json({ user, token });

};

export const me = async (req: Request, res: Response) => {
    res.json(req.user);
}