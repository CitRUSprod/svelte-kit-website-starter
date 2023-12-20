import { z } from "zod"
import { createValidator } from "$lib/utils"

export const email = createValidator(z.string().trim().toLowerCase().email())

export const username = createValidator(z.string().trim().min(3).max(32))

export const password = createValidator(z.string().trim().min(8))
