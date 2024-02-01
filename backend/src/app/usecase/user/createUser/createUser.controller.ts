import { Request, Response } from "express"
import { createUserService } from "./createUser.service"
import { User } from "../../../../domain/user.entity"

export async function createUserController(req: Request, res: Response) {
    try {
        const createUserRequest: User = req.body

        const { httpCode, message, data, error } = await createUserService(createUserRequest)

        return res.status(httpCode).send({ message, data, error })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}