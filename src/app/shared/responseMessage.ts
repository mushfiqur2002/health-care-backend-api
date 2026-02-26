// res.status(200).json({
//     success: true,
//     message: "delete successfully",
//     data: result
// })

import { Response } from "express"
interface responsiveData {
    httpStatusCode: number
    success: boolean,
    message?: string,
    data?: any
}

const responseMessage = (res: Response, responseData: responsiveData) => {
    const { httpStatusCode, success, message, data } = responseData
    res.send(httpStatusCode).json({
        success,
        message,
        data
    })
}

export default responseMessage