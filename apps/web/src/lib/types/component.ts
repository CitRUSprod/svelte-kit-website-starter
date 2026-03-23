import type { ClassValue } from "svelte/elements"

export interface ComponentBasicProps {
    class?: ClassValue
    [dataKey: `data-${string}`]: string
}

export type ComponentBasicVariant = "success" | "error" | "warning" | "info"

export type ComponentVariant = "default" | "primary" | ComponentBasicVariant

export type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl"
