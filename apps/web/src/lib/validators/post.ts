import * as schemasModels from "@local/schemas/models"
import { createValidator } from "@local/utils"

export const title = createValidator(schemasModels.post.title())
export const content = createValidator(schemasModels.post.content())
