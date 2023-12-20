import { z } from "zod"
import { createValidator } from "$lib/utils"

export const title = createValidator(z.string().trim().min(1).max(100))

export const content = createValidator(z.string().trim().min(1))
