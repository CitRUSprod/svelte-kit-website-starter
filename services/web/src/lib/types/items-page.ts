export interface ItemsPage<T> {
    page: number
    pages: number
    perPage: number
    totalItems: number
    items: Array<T>
}
