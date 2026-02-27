import { Router } from "express";
import { SpecialtyRouter } from "../modules/specialty/specialty.router";
import { Authrouter } from "../modules/auth/auth.router";

const router = Router()

router.use('/specialty', SpecialtyRouter)
router.use('/auth', Authrouter)


export const IndexRouter = router