import dotenv from 'dotenv'
import { ENVConfig } from '../interface'
dotenv.config()


const loadEndVariables = (): ENVConfig => {
    const requireVariables = [
        'PORT',
        'DATABASE_URL',
        'BETTER_AUTH_SECRET',
        'BETTER_AUTH_URL'
    ]

    requireVariables.forEach((variable) => {
        if (!process.env[variable]) {
            throw new Error(`Enviroment variable ${variable} is required but not set in .env file.`);
        }
    })
    return {
        PORT: process.env.PORT as string,
        DATABASE_URL: process.env.DATABASE_URL as string,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET as string,
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL as string
    }
}

export const envVars = loadEndVariables()