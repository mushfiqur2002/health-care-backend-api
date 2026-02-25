import { Response, Request } from "express"
import { SpecialtyService } from "./specialty.service";

// --> this is use control the route.
// --> handel the response and request

const createSpecialty = async (req: Request, res: Response) => {
    try {
        const payload = req.body
        const result = await SpecialtyService.createSpecialty(payload)

        res.status(201).json({
            success: true,
            message: "create specialty successfully",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            data: error.message,
        })
    }
}


const getAllSpecialty = async (req: Request, res: Response) => {
    try {
        const result = await SpecialtyService.getAllSpecialty()

        res.status(201).json({
            success: true,
            message: "get all specialty successfully",
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            data: error.message,
        })
    }
}

const getSpecialtyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await SpecialtyService.getSpecialtyById(id)

        if (!result) {
            return res.status(404).json({ success: false, message: "Not found" })
        }

        res.status(200).json({ success: true, data: result })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const deleteSpecialtyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await SpecialtyService.deleteSpecialtyById(id)

        if (!result) {
            return res.status(404).json({ success: false, message: "Not found" })
        }

        res.status(200).json({ success: true, data: result })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
}


export const SpecialtyController = {
    createSpecialty,
    getAllSpecialty,
    getSpecialtyById,
    deleteSpecialtyById
}