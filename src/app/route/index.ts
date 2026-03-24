import { Router } from "express";
import { SpecialtyRouter } from "../modules/specialty/specialty.router";
import { AuthRouter } from "../modules/auth/auth.router";
import { DoctorRouter } from "../modules/doctor/doctor.router";

const router = Router()

router.use('/specialty', SpecialtyRouter)
router.use('/auth', AuthRouter)
router.use('/doctor', DoctorRouter)


export const IndexRouter = router
