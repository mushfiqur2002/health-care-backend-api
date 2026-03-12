import { Router } from "express";
import { SpecialtyRouter } from "../modules/specialty/specialty.router";
import { Authrouter } from "../modules/auth/auth.router";
import { Userrouter } from "../modules/user/user.router";

const router = Router()

router.use('/specialty', SpecialtyRouter)
router.use('/auth', Authrouter)
router.use('/user', Userrouter)


export const IndexRouter = router



// 3f535cb3 - c93e - 466c - 9e48 - 1e5a9a561d0c
// 356064d7 - 15a6 - 4fc5 - 8b11 - dcf333542d22