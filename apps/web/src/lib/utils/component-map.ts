import type { ComponentBasicVariant, ComponentVariant, ComponentSize } from "$lib/types"

export const componentBasicVariants: ReadonlyArray<ComponentBasicVariant> = [
    "success",
    "error",
    "warning",
    "info"
]

export const componentVariants: ReadonlyArray<ComponentVariant> = [
    "default",
    "primary",
    ...componentBasicVariants
]

export const componentSizes: ReadonlyArray<ComponentSize> = ["xs", "sm", "md", "lg", "xl"]

export function getComponentBasicVariantMap(variant: ComponentBasicVariant) {
    const result = Object.fromEntries(componentBasicVariants.map(v => [v, v === variant]))
    return result as Record<ComponentBasicVariant, boolean>
}

export function getComponentVariantMap(variant: ComponentVariant) {
    const result = Object.fromEntries(componentVariants.map(v => [v, v === variant]))
    return result as Record<ComponentVariant, boolean>
}

export function getComponentSizeMap(size: ComponentSize) {
    const result = Object.fromEntries(componentSizes.map(s => [s, s === size]))
    return result as Record<ComponentSize, boolean>
}
