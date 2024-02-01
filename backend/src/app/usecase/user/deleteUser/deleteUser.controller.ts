import { Request, Response } from "express"
import { deleteUserService } from "./deleteUser.service"
import { getDataTokenPromise } from "../../../../utils/token/getDataFromToken"

export async function deleteUserController(req: Request, res: Response) {
    try {
        const { email } = await getDataTokenPromise(String(req.headers.authorization))

        const { httpCode, message, data, error } = await deleteUserService(email)

        return res.status(httpCode).send({ message, data, error })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}