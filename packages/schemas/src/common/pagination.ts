import { z } from "@local/utils"

export function page() {
    return z.coerce.number().int().min(1)
}

export type Page = z.infer<ReturnType<typeof page>>

export function pages() {
    return z.coerce.number().int().min(0)
}

export type Pages = z.infer<ReturnType<typeof pages>>

export function perPage() {
    return z.coerce.number().int().min(1).max(100)
}

export type PerPage = z.infer<ReturnType<typeof perPage>>

export function totalItems() {
    return z.coerce.number().int().min(0)
}

export type TotalItems = z.infer<ReturnType<typeof totalItems>>

export function itemsData<T extends z.AnyZodObject>(item: T) {
    return z.object({
        totalItems: totalItems(),
        items: z.array(item)
    })
}

export type ItemsData = z.infer<ReturnType<typeof itemsData>>

export function itemsPage<T extends z.AnyZodObject>(item: T) {
    return z.object({
        page: page(),
        pages: pages(),
        perPage: perPage(),
        ...itemsData(item).shape
    })
}

export type ItemsPage = z.infer<ReturnType<typeof itemsPage>>

export function pagination() {
    return z.object({
        page: page().default(1),
        perPage: perPage().default(10)
    })
}

export type Pagination = z.infer<ReturnType<typeof pagination>>
