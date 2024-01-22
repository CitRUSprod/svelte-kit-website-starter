import * as schemasModels from "@local/schemas/models"
import { createValidator } from "$lib/utils"

export const email = createValidator(schemasModels.user.email())
export const username = createValidator(schemasModels.user.username())
export const password = createValidator(schemasModels.user.password())
