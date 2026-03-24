import { Response, Request } from "express"
import { SpecialtyService } from "./specialty.service";
import catchAsync from "../../shared/catchAsync";
import responseMessage from "../../shared/responseMessage";
import status from "http-status";

// --> this is use control the route.
// --> handel the response and request

const createSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body
        const result = await SpecialtyService.createSpecialty(payload)

        responseMessage(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: "create specialty successfully",
            data: result
        })
    }
)

const getAllSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const result = await SpecialtyService.getAllSpecialty()

        responseMessage(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "get all specialty successfully",
            data: result
        })
    }
)

const getSpecialtyById = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params
        const result = await SpecialtyService.getSpecialtyById(id)
        if (!result) {
            return responseMessage(res, {
                httpStatusCode: status.NOT_FOUND,
                success: false,
                message: "not found"
            })
        }

        responseMessage(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "get specialty by id successfully",
            data: result
        })
    }
)

const updateSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params
        const payload = req.body
        const result = await SpecialtyService.updateSpecialty(id, payload) as string | undefined
        if (!result) {
            return responseMessage(res, {
                httpStatusCode: status.NOT_FOUND,
                success: false,
                message: 'delete specialty unsucessfully'
            })
        }

        responseMessage(res, {
            httpStatusCode: status.OK,
            success: true,
            message: 'update specialty successfully',
            data: result
        })
    }
)

const deleteSpecialtyById = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params
        const result = await SpecialtyService.deleteSpecialtyById(id)
        if (!result) {
            return responseMessage(res, {
                httpStatusCode: status.NOT_FOUND,
                success: false,
                message: "not found"
            })
        }

        responseMessage(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "delete successfully",
            data: result
        })
    }
)

export const SpecialtyController = {
    createSpecialty,
    getAllSpecialty,
    getSpecialtyById,
    updateSpecialty,
    deleteSpecialtyById
}