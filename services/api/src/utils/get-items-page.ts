import { JsonObject } from "type-fest"

interface ItemsData {
    itemCount: number
    items: Array<JsonObject>
}

export async function getItemsPage(
    itemsPerPage: number | undefined,
    pageNumber: number | undefined,
    getItemsData: (skip: number, take: number) => Promise<ItemsData>
) {
    let perPage: number

    if (itemsPerPage === undefined) {
        perPage = 10
    } else if (itemsPerPage < 1) {
        perPage = 1
    } else if (itemsPerPage > 100) {
        perPage = 100
    } else {
        perPage = itemsPerPage
    }

    let page: number

    if (pageNumber === undefined || pageNumber < 1) {
        page = 1
    } else {
        page = pageNumber
    }

    const skip = perPage * (page - 1)
    const take = perPage

    const { itemCount, items } = await getItemsData(skip, take)

    const pageCount = Math.ceil(itemCount / perPage)

    return {
        pageNumber: page,
        pageCount,
        itemsPerPage: perPage,
        itemCount,
        items
    }
}
