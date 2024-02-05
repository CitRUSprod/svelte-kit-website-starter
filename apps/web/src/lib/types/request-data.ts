/* eslint-disable @typescript-eslint/no-invalid-void-type */

import type { JsonObject } from "type-fest"

export type RequestData<T extends JsonObject | void> = (T extends void ? unknown : T) & {
    headers?: Headers
}
