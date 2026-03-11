import { Gender } from "../../generate/prisma/enums"

export interface IRegister {
    name: string,
    email: string,
    password: string
}

export interface ILogInAllUser {
    email: string,
    password: string
}

export interface ICreateDocotor {
    password: string,
    doctor: {
        name: string,
        email: string,
        profilePicture?: string,
        contactNumber?: string,
        address?: string,
        gender: Gender,
        registrationNumber: string,
        experience: number,
        specialization: string,
        appointmentFee: number
        designation: string
        averageRating: number
        qualification: string
    },
    specialties: []
}