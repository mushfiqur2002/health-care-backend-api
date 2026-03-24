import { Router } from "express";
import { DoctorController } from "./doctor.controller";

const router = Router()

router.post('/registration', DoctorController.createDoctor)
router.patch('/update', DoctorController.updateDoctor)
router.delete('/delelte', DoctorController.deleteDoctor)

export const DoctorRouter = router