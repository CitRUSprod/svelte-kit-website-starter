import * as schemasCommon from "@repo/schemas/common"
import * as schemasModels from "@repo/schemas/models"
import { createValidator } from "@repo/utils"

export const email = createValidator(schemasCommon.$email())
export const username = createValidator(schemasModels.user.$username())
export const password = createValidator(schemasModels.user.$password())
