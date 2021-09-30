export interface ItemsPage<T = any> {
    pageNumber: number
    pageCount: number
    itemsPerPage: number
    itemCount: number
    items: Array<T>
}
