import { Specialty } from "../../../generate/prisma/client";
import { ICreateDocotor } from "../../interface";
import auth from "../../lib/auth";
import { prisma } from "../../lib/prisma";

const createDoctor = async (payload: ICreateDocotor) => {
    const specialties: Specialty[] = []

    for (const specialtyId of payload.specialties) {
        const specialty = await prisma.specialty.findUnique({
            where: {
                id: specialtyId
            }
        })

        if (!specialty) {
            throw new Error(`Specialty with id ${specialtyId} not found.`);
        }
        specialties.push(specialty);
    }

    const userExists = await prisma.user.findUnique({
        where: {
            id: payload.doctor.email
        }
    })

    if (userExists) {
        throw new Error('this user already exist')
    }

    const data = await auth.api.signUpEmail({
        body: {
            name: payload.doctor.name,
            email: payload.doctor.email,
            password: payload.password,
        }
    })

    if (!data.user) {
        throw new Error('Doctor Registration Failed')
    }

    try {
        const doctor = await prisma.$transaction(async (tx) => {
            const doctorTx = await tx.doctor.create({
                data: {
                    userId: data.user.id,
                    ...payload.doctor,
                    specialties: {

                    }
                }
            })
        })

    } catch (error) {
        await prisma.user.delete({
            where: { id: data.user.id }
        })
        throw new Error('Something Wrong')
    }

    return data
}