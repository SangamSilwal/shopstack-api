import { NextFunction ,Request , Response} from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import * as jwt from "jsonwebtoken"
import { JWT_SECREAT } from "../confidential";
import { prismaClient } from "..";

export const authMiddleware = async(req:Request,res:Response,next:NextFunction) => {
    try {
        //1-> Extract the token from header
        const token = req.headers.authorization
        //2-> If token is not present, throw an error of unauthorized
        if(!token)
        {
            throw new UnauthorizedException('Unauthorized',ErrorCodes.UNAUTHORIZED_ERROR_CODE)
        }
        //3-> if the token is present verify the token and extract the payload
        const payload = jwt.verify(token,JWT_SECREAT) as any
        //4-> to get the user from the payload
        const user = await prismaClient.user.findFirst({where:{id:payload.userId}})
        if(!user)
        {
            throw new UnauthorizedException('Unauthorized',ErrorCodes.UNAUTHORIZED_ERROR_CODE)
        }
        //5-> to attach the user to the current request obj
        req.user = user
        next()
    } catch (error) {
            throw new UnauthorizedException('Unauthorized',ErrorCodes.UNAUTHORIZED_ERROR_CODE)
    }
}