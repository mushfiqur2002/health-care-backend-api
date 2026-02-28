import { error } from "node:console";
import auth from "../../lib/auth";
import { Status } from "../../../generate/prisma/enums";
import { prisma } from "../../lib/prisma";

const registerPatient = async (payload: IRegister) => {
    const { name, email, password } = payload;
    const data = await auth.api.signUpEmail({
        body: { name, email, password },
    });

    if (data) {
        // const patient = await prisma.patient.create({
        //     data: data
        // })
    }

    if (!data.user) {
        throw new Error('register or sign-up failed')
    }
    return data
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