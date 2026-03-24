import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import responseMessage from "../../shared/responseMessage";
import status from "http-status";
import { DoctorService } from "./doctor.service";

const createDoctor = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body
        const result = await DoctorService.createDoctor(payload)

        responseMessage(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: 'successfull registerd as a doctor',
            data: result
        })
    }
)

const updateDoctor = catchAsync(
    async (req: Request, res: Response) => {
        const { id }: any = req.params
        const payload = req.body
        const result = await DoctorService.updateDoctor(id, payload)

        responseMessage(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: 'successfull registerd as a doctor',
            data: result
        })
    }
)

const deleteDoctor = catchAsync(
    async (req: Request, res: Response) => {
        const { id }: any = req.params
        const result = await DoctorService.deleteDoctor(id)
        responseMessage(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: 'successfull registerd as a doctor',
            data: result
        })
    }
)

export const DoctorController = {
    createDoctor,
    updateDoctor,
    deleteDoctor
}