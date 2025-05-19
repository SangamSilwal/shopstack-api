import { NextFunction, Request, Response } from "express"
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken"
import { JWT_SECREAT } from "../confidential";
import { BadRequestsException } from "../exceptions/bad_request";
import { ErrorCodes } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignupSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not_found";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    SignupSchema.parse(req.body)
    const { email, password, name } = req.body;
    let user = await prismaClient.user.findFirst({
        where: { email }
    })
    if (user) {
        throw new BadRequestsException("User Already Exists", ErrorCodes.USER_ALREADY_EXISTS)

    }

    user = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10)
        }
    })
    res.json(user)
}
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    let user = await prismaClient.user.findFirst({ where: { email } })
    if (!user) {
        throw new NotFoundException('User Not found',ErrorCodes.USER_NOT_FOUND)
        }
    if (!compareSync(password, user.password)) {
        throw new BadRequestsException("Incorrect Password", ErrorCodes.INCORRECT_PASSWORD)
    }
    const token = jwt.sign({
        userId: user.id

    }, JWT_SECREAT)

    res.json({ user, token })
}

export const me = async(req:Request,res:Response)=> {
    
    res.json(req.user)
}