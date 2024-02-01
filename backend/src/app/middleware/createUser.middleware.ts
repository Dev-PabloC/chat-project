import { Request, Response, NextFunction } from "express"
import { userSchemaZod } from "../../utils/zod/user.schema"

export async function createUserTypeMiddleware(req: Request, res: Response, next: NextFunction) {
    const verification = await userSchemaZod.safeParseAsync(req.body)

    if (verification.success) {
        next()
    } else {
        return res.status(400).send({ error: verification.error.message })
    }
}