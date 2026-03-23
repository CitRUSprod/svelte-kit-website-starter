import { z } from "@repo/utils"

import { $id } from "../id"

import * as models from "$/models"

export function $message() {
    return z.object({
        uuid: z.string(),
        user: z.object({
            id: $id(),
            username: models.user.$username()
        }),
        text: z.string()
    })
}

export type $Message = z.infer<ReturnType<typeof $message>>
