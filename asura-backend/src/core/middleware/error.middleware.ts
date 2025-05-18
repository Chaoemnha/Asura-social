import { HttpException } from "@core/exceptions";
import { logger } from "@core/utils";
import { NextFunction, Request, Response } from "express";

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status: number = error.status||500;
    const message: string = error.message ||'Something went wrong!';

    logger.error(`[ERROR] - Status: ${status}, Message: ${message}`);
    res.status(status).json({message: message});//Moe, o day res: Response la tu express, de mac dinh la sai
};

export default errorMiddleware;