import { Request, Response, NextFunction } from "express"
import { updateUserSchemaZod } from "../../utils/zod/user.schema"

export async function updateUserTypeMiddleware(req: Request, res: Response, next: NextFunction) {
    const verification = await updateUserSchemaZod.safeParseAsync(req.body)

    if (verification.success) {
        next()
    } else {
        return res.status(400).send({ error: verification.error.message })
    }
}