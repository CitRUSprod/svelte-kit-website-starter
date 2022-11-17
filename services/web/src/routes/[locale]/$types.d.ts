import type { Load } from "@sveltejs/kit"

export interface LayoutData {
    route: string
    [key: string]: unknown
}

export type LayoutLoad = Load<Record<string, string>, null, LayoutData>
