import { Role } from "../../../generate/prisma/enums";
import { ICreateDocotor } from "../../interface";
import auth from "../../lib/auth";
import { prisma } from "../../lib/prisma";

const createDoctor = async (payload: ICreateDocotor) => {

    // 1️⃣ Validate specialties
    const specialties = await prisma.specialty.findMany({
        where: {
            id: { in: payload.specialties }
        }
    });

    if (specialties.length !== payload.specialties.length) {
        throw new Error("One or more specialties not found");
    }

    // 2️⃣ Check if user already exists
    const userExists = await prisma.user.findUnique({
        where: {
            email: payload.doctor.email
        }
    });

    if (userExists) {
        throw new Error("This user already exists");
    }

    // 3️⃣ Check doctor registration number
    const doctorExists = await prisma.doctor.findUnique({
        where: {
            registrationNumber: payload.doctor.registrationNumber
        }
    });

    if (doctorExists) {
        throw new Error("Doctor with this registration number already exists");
    }

    // 4️⃣ Create auth user
    const data = await auth.api.signUpEmail({
        body: {
            name: payload.doctor.name,
            email: payload.doctor.email,
            password: payload.password,
            role: Role.DOCTOR
        }
    });

    if (!data.user) {
        throw new Error("Doctor registration failed");
    }

    try {

        const doctor = await prisma.$transaction(async (tx) => {

            // 5️⃣ Create doctor
            const doctorTx = await tx.doctor.create({
                data: {
                    userId: data.user.id,
                    ...payload.doctor
                }
            });

            // 6️⃣ Create doctor-specialty relations
            const doctorSpecialty = specialties.map((s) => ({
                doctorId: doctorTx.id,
                specialtyId: s.id
            }));

            await tx.doctorSpecialty.createMany({
                data: doctorSpecialty
            });

            // 7️⃣ Fetch doctor with specialties
            const doctorWithSpecialties = await tx.doctor.findUnique({
                where: {
                    id: doctorTx.id
                },
                include: {
                    specialties: {
                        include: {
                            specialty: true
                        }
                    }
                }
            });

            // 8️⃣ Clean response format
            const formattedDoctor = {
                ...doctorWithSpecialties,
                specialties: doctorWithSpecialties?.specialties.map((s) => s.specialty)
            };

            return formattedDoctor;

        });

        return { ...data, doctor };

    } catch (error) {

        console.log(error);

        // rollback user if doctor creation fails
        await prisma.user.delete({
            where: { id: data.user.id }
        });

        throw new Error("Doctor creation failed");
    }
};

export const UserService = {
    createDoctor
};