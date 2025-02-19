import * as schemasEnv from "@repo/schemas/env"
import { parseDataBySchema } from "@repo/utils"

export const env = parseDataBySchema(schemasEnv.api(), process.env)
