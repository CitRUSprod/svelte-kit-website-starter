import path from "node:path"

export function getTestsPath(...parts: Array<string>) {
    return path.join(__dirname, "..", ...parts)
}
