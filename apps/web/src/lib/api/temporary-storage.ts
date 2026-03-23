import * as constantsRoutes from "@repo/constants/routes"
import * as schemasRoutes from "@repo/schemas/routes"

import type { RequestData } from "$lib/types"
import { axios, createApiUrl, createAxiosConfig } from "$lib/utils"

export function uploadImage(data: RequestData<schemasRoutes.temporaryStorage.$UploadImageRequest>) {
    const fd = new FormData()
    fd.append("img", data.img)
    return axios.post<schemasRoutes.temporaryStorage.$UploadImageResponse>(
        createApiUrl(constantsRoutes.temporaryStorage.uploadImage),
        fd,
        createAxiosConfig(data.headers)
    )
}
