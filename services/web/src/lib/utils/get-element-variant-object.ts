import type { ElementBasicVariant, ElementVariant } from "$lib/types"

const basicTypes: Array<ElementBasicVariant> = ["success", "error", "warning", "info"]
const types: Array<ElementVariant> = ["default", "primary", ...basicTypes]

export function getElementBasicVariantObject(type: ElementBasicVariant) {
    const result = Object.fromEntries(basicTypes.map(t => [t, t === type]))
    return result as Record<ElementBasicVariant, boolean>
}

export function getElementVariantObject(type: ElementVariant) {
    const result = Object.fromEntries(types.map(t => [t, t === type]))
    return result as Record<ElementVariant, boolean>
}
