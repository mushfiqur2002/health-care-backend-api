// --> this is use for bussiness logic.
// --> send, delete, update logic here. 

import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


// create specailty
const createSpecialty = async (payload: Specialty): Promise<Specialty> => {
    const specialty = await prisma.specialty.create({
        data: payload
    })
    return specialty
}

// get all specialty
const getAllSpecialty = async () => {
    const specialty = await prisma.specialty.findMany()
    return specialty
}

// get specialty by id
const getSpecialtyById = async (id: string | any) => {
    const specialty = await prisma.specialty.findUnique({
        where: { id }
    })
    return specialty
}

// delete specialty by id
const deleteSpecialtyById = async (id: string | any) => {
    const specialty = await prisma.specialty.delete({
        where: { id }
    })
    return specialty
}


export const SpecialtyService = {
    createSpecialty,
    getAllSpecialty,
    getSpecialtyById,
    deleteSpecialtyById
}