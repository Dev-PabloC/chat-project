import { Request, Response } from "express"
import { getUserService } from "./getUser.service"
import { emailSchemaZod } from "../../../../utils/zod/email.schema"

export async function getUserController(req: Request, res: Response) {
    try {
        const { email }: { email: string } = req.body

        const verification = await emailSchemaZod.parseAsync(email)

        const { httpCode, message, data, error } = await getUserService(verification)

        return res.status(httpCode).send({ message, data, error })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}