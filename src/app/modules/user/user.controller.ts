import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import responseMessage from "../../shared/responseMessage";
import status from "http-status";

const createDoctor = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body
        const result = await UserService.createDoctor(payload)

        responseMessage(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: 'successfull registerd as a doctor',
            data: result
        })
    }
)


export const UserController = {
    createDoctor
}