import jwt, { JwtPayload, SignOptions, verify } from "jsonwebtoken";

const createToken = (payload: JwtPayload, secret: string, { expiresIn }: SignOptions) => {
    const token = jwt.sign(payload, secret, { expiresIn })
    return token
}

const verifyToken = (token: string, secret: string) => {
    try {
        const decodeed = jwt.verify(token, secret) as JwtPayload
        return {
            success: true,
            data: decodeed
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
            error
        }
    }
}