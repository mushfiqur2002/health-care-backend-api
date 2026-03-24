import { NextFunction, Request, Response } from "express";
import responseMessage from "../shared/responseMessage";
import status from "http-status";

export const globalError = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction) => {
    responseMessage(res, {
        httpStatusCode: status.INTERNAL_SERVER_ERROR,
        success: false,
        message: err.message || "something went wrong",
        data: null
    })
}