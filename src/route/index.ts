import { Router } from "express";
import { SpecialtyRouter } from "../modules/specialty/specialty.router";

const router = Router()

router.use('/specialty', SpecialtyRouter)


export const IndexRouter = router