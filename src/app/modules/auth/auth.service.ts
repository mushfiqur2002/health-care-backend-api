import { error } from "node:console";
import auth from "../../lib/auth";
import { Status } from "../../../generate/prisma/enums";

const registerPatient = async (payload: IRegister) => {
    const { name, email, password } = payload;
    const data = await auth.api.signUpEmail({
        body: { name, email, password },
    });

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
}

export const AuthService = {
    registerPatient,
    logInAllUser
}