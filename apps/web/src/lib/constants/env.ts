import * as schemasEnv from "@repo/schemas/env"
import { parseDataBySchema } from "@repo/utils"

import * as publicEnv from "$env/static/public"

export const env = parseDataBySchema(schemasEnv.web(), publicEnv)
