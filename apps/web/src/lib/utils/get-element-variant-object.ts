import type { ElementBasicVariant, ElementVariant } from "$lib/types"

export const elementBasicVariants: ReadonlyArray<ElementBasicVariant> = [
    "success",
    "error",
    "warning",
    "info"
]

export const elementVariants: ReadonlyArray<ElementVariant> = [
    "default",
    "primary",
    ...elementBasicVariants
]

export function getElementBasicVariantObject(type: ElementBasicVariant) {
    const result = Object.fromEntries(elementBasicVariants.map(v => [v, v === type]))
    return result as Record<ElementBasicVariant, boolean>
}

export function getElementVariantObject(type: ElementVariant) {
    const result = Object.fromEntries(elementVariants.map(v => [v, v === type]))
    return result as Record<ElementVariant, boolean>
}
