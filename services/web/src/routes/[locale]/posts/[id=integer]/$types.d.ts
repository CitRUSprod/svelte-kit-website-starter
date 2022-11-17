import type { Load } from "@sveltejs/kit"

export interface PageData {
    id: number
    [key: string]: unknown
}

export type PageLoad = Load<Record<string, string>, null, PageData>
