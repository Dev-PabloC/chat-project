import { z } from "zod"

export const userSchemaZod = z.object({
    username: z.string().min(4, 'Insira 4 caracteres ou mais').max(30, 'Insira 30 caracteres ou menos'),
    email: z.string().min(4, 'Insira 4 caracteres ou mais').email('Insira um email válido'),
    password: z.string()
})

export const updateUserSchemaZod = userSchemaZod.optional()