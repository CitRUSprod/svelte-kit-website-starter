import { z } from "zod"
import { createValidator } from "$lib/utils"

export const name = createValidator(z.string().trim().toLowerCase().min(1))
