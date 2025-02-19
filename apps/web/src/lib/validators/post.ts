import * as schemasModels from "@repo/schemas/models"
import { createValidator } from "@repo/utils"

export const title = createValidator(schemasModels.post.title())
export const content = createValidator(schemasModels.post.content())
