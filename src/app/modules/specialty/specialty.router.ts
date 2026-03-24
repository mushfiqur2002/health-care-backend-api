import { Router } from "express";
import { SpecialtyController } from "./specialty.controller";

const router = Router()

router.post('/', SpecialtyController.createSpecialty)
router.get('/', SpecialtyController.getAllSpecialty)
router.get('/:id', SpecialtyController.getSpecialtyById)
router.patch('/:id', SpecialtyController.updateSpecialty)
router.delete('/:id', SpecialtyController.deleteSpecialtyById)

export const SpecialtyRouter = router