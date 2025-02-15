export type DropdownMenuItemValue = string | number | null | undefined

export interface DropdownMenuItem<T extends DropdownMenuItemValue = DropdownMenuItemValue> {
    text: string
    value: T
}
