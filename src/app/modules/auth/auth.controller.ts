import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { AuthService } from "./auth.service";
import responseMessage from "../../shared/responseMessage";

const registerPatient = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body
        const result = await AuthService.registerPatient(payload)

        responseMessage(res, {
            httpStatusCode: 201,
            success: true,
            message: 'successfully register as a patient',
            data: result,
        })
    }
)

const logInAllUser = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body
        const result = await AuthService.logInAllUser(payload)

        responseMessage(res, {
            httpStatusCode: 201,
            success: true,
            message: "log in user successfully",
            data: result
        })
    }
)

export const AuthController = {
    registerPatient,
    logInAllUser
}