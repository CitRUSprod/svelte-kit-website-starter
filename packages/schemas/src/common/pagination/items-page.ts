import { z } from "@repo/utils"

import { $page } from "./page"
import { $pages } from "./pages"
import { $perPage } from "./per-page"
import { $totalItems } from "./total-items"

export function $itemsPage<T extends z.ZodObject<any>>(item: T) {
    return z.object({
        page: $page(),
        pages: $pages(),
        perPage: $perPage(),
        totalItems: $totalItems(),
        items: z.array(item)
    })
}

export type $ItemsPage = z.infer<ReturnType<typeof $itemsPage>>
