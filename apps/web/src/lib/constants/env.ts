import * as schemasEnv from "@local/schemas/env"
import { parseDataBySchema } from "@local/utils"
import * as publicEnv from "$env/static/public"

export const env = parseDataBySchema(schemasEnv.web(), publicEnv)
