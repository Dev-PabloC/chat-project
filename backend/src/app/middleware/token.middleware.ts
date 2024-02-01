import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

export async function tokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).send({ error: 'no login' })
    }

    verify(String(token), String(process.env.JWTSECRET), (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "acess denied" })
        } else {
            next()
        }

    })
}