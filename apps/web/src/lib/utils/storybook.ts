export function disableControls(...props: Array<string>) {
    const result: Record<string, { control: false }> = {}

    for (const prop of props) {
        result[prop] = { control: false }
    }

    return result
}
