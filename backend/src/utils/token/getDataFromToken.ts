import { verify } from "jsonwebtoken"

export async function getDataTokenPromise(token: string): Promise<{ id: string, email: string }> {
    const { id, email } = verify(String(token), String(process.env.JWTSECRET)) as { id: string, email: string }

    return new Promise((resolve, reject) => {
        if (id && email) {
            resolve({ id, email })
        } else {
            reject("No data in token")
        }
    })
}