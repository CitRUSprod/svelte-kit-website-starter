import type { JsonObject } from "type-fest"

interface ItemsData<T extends JsonObject> {
    totalItems: number
    items: Array<T>
}

export async function getItemsPage<T extends JsonObject>(
    page: number,
    perPage: number,
    getItemsData: (skip: number, take: number) => Promise<ItemsData<T>>
) {
    const skip = perPage * (page - 1)
    const take = perPage

    const { totalItems, items } = await getItemsData(skip, take)

    const pages = Math.ceil(totalItems / perPage)

    return { page, pages, perPage, totalItems, items }
}
