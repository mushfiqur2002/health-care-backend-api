import auth from "../../lib/auth";
import { Status } from "../../../generate/prisma/enums";
import { prisma } from "../../lib/prisma";

const registerPatient = async (payload: IRegister) => {
    const { name, email, password } = payload;
    const data = await auth.api.signUpEmail({
        body: { name, email, password },
    });

    if (!data.user) {
        throw new Error('register or sign-up failed')
    }

    try {
        const patient = await prisma.$transaction(async (tx) => {
            const patientTx = await tx.patient.create({
                data: {
                    userId: data.user.id,
                    name: data.user.name,
                    email: data.user.email
                }
            })
            return patientTx
        })

        return { ...data, patient }
    } catch (error) {
        await prisma.user.delete({
            where: { id: data.user.id }
        })
        throw new Error('Something Wrong')
    }
}

const logInAllUser = async (payload: ILogInAllUser) => {
    const { email, password } = payload
    const data = await auth.api.signInEmail({
        body: { email, password }
    })

    if (data.user.status === Status.BLOCKED) {
        return new Error('user is blocked')
    }
    if (data.user.isDeleted) {
        return new Error('this user is deleted')
    }
    return data
}

export const AuthService = {
    registerPatient,
    logInAllUser
}