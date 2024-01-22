import * as schemasModels from "@local/schemas/models"
import { createValidator } from "$lib/utils"

export const title = createValidator(schemasModels.post.title())
export const content = createValidator(schemasModels.post.content())
