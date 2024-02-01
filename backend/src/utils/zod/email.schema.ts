import { z } from "zod"

export const emailSchemaZod = z.string().email('Insira um email valido')