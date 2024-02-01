import { z } from "zod"

const authLoginSchemaZod = z.object({
    email: z.string().email('Insira um email valido'),
    password: z.string()
})

export default authLoginSchemaZod