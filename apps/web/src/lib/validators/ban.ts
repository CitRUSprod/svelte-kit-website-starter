import * as schemasModels from "@local/schemas/models"
import { createValidator } from "@local/utils"

export const reason = createValidator(schemasModels.ban.reason())
