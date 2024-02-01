import { Request, Response } from "express"
import { loginService } from "./login.service"

export async function loginController(req: Request, res: Response) {
    try {
        const { email, password }: { email: string, password: string } = req.body

        const { httpCode, message, data, error } = await loginService(email, password)

        return res.status(httpCode).setHeader('authorization', String(data)).send({ message, data, error })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}