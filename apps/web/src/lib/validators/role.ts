import * as schemasModels from "@local/schemas/models"
import { createValidator } from "@local/utils"

export const name = createValidator(schemasModels.role.name())
