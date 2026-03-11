import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { AuthService } from "./auth.service";
import responseMessage from "../../shared/responseMessage";
import status from "http-status";

const registerPatient = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body
        const result = await AuthService.registerPatient(payload)

        responseMessage(res, {
            httpStatusCode: status.CREATED,
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
        console.log(result);

        responseMessage(res, {
            httpStatusCode: status.OK,
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