import { Request, Response, NextFunction } from "express"
import authLoginSchemaZod from "../../utils/zod/authLogin.schema"

export async function authTypeMiddleware(req: Request, res: Response, next: NextFunction) {
    const verification = await authLoginSchemaZod.safeParseAsync(req.body)

    if (verification.success) {
        next()
    } else {
        return res.status(400).send({ error: verification.error.message })
    }
}