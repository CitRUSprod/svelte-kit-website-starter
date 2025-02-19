import * as schemasModels from "@repo/schemas/models"
import { createValidator } from "@repo/utils"

export const reason = createValidator(schemasModels.ban.reason())
