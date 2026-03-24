// --> this is use for bussiness logic.
// --> send, delete, update logic here. 

import { error } from "node:console";
import { Specialty } from "../../../generate/prisma/client";
import { prisma } from "../../lib/prisma";


// create specailty
const createSpecialty = async (payload: Specialty): Promise<Specialty> => {
    const { title } = payload
    const existSpecialty = await prisma.specialty.findUnique({
        where: { title }
    })

    if (existSpecialty) {
        throw new Error('specialty unique not copy')
    }

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

// update specialty 
const updateSpecialty = async (id: string | any, payload: Partial<Specialty>) => {
    const specialtyExist = prisma.specialty.findUnique({
        where: { id }
    })
    if (!specialtyExist) {
        throw new Error('Given Specialty does not exists')
    }

    const specialty = prisma.$transaction(async (tx) => {
        const updateSpecialy = await tx.specialty.update({
            where: { id },
            data: { ...payload }
        })
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
    updateSpecialty,
    deleteSpecialtyById
}