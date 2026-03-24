import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router()

router.post('/register', AuthController.AuthRegistration)
router.post('/login', AuthController.AuthLogIn)

export const AuthRouter = router