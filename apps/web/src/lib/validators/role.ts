import * as schemasModels from "@repo/schemas/models"
import { createValidator } from "@repo/utils"

export const name = createValidator(schemasModels.role.name())
