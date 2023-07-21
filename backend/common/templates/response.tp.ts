import { Response } from "express";

export default function templateResponse(response: Response, type: string, message: any, statusCode: number): void {
    response.send({
        type,
        message,
        statusCode
    })
}