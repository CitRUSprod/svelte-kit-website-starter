import * as schemasModels from "@local/schemas/models"
import { createValidator } from "$lib/utils"

export const name = createValidator(schemasModels.role.name())
