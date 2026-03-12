import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router()

router.post('/doctor-register', UserController.createDoctor) 

export const Userrouter = router