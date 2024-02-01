import { updateUser } from './../../../../domain/user.entity';
import { Request, Response } from "express"
import { getDataTokenPromise } from "../../../../utils/token/getDataFromToken"
import { typeToken } from '../../../../utils/token/tokenType';
import { updateUserService } from './updateUser.service';

export async function updateUserController(req: Request, res: Response) {
    try {
        const { email } = await getDataTokenPromise(String(req.headers.authorization))

        const updateRequest: updateUser = req.body

        const { httpCode, message, data, error } = await updateUserService(email, updateRequest)

        return res.status(httpCode).send({ message, data, error })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}