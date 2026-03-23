import { z } from "@repo/utils"

import * as common from "$/common"

export function $temporaryImage() {
    return z.object({
        id: common.$id(),
        image: common.$img()
    })
}

export type $TemporaryImage = z.infer<ReturnType<typeof $temporaryImage>>
