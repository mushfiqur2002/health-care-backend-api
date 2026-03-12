import { NextFunction, Request, RequestHandler, Response } from "express"

const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // try {
        //     await fn(req, res, next)
        // } catch (error: any) {
        //     responseMessage(res, {
        //         httpStatusCode: 500,
        //         success: false,
        //         message: 'something went wrong',
        //         data: error.message
        //     })
        // }

        Promise.resolve(fn(req, res, next)).catch(next)
    }
}

export default catchAsync