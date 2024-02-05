import * as schemasEnv from "@local/schemas/env"
import { parseDataBySchema } from "@local/utils"

export const env = parseDataBySchema(schemasEnv.api(), process.env)
