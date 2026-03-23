import { z } from "@repo/utils"

import { $order } from "../sorting/order"
import { $sort } from "../sorting/sort"

import { $itemsPage } from "./items-page"

export function $itemsPageSorting<T extends string, K extends z.ZodObject<any>>(
    [field, ...fields]: [T, ...Array<T>],
    item: K
) {
    return z.object({
        sort: $sort(field, ...fields),
        order: $order(),
        ...$itemsPage(item).shape
    })
}

export type $ItemsPageSorting = z.infer<ReturnType<typeof $itemsPageSorting>>
