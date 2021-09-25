import { parse } from "cookie"

export const cookies = {
    parse,
    getKeyValuePairs(cookieArray: Array<string>) {
        return cookieArray.map(c => c.split("; ")[0])
    },
    merge(...cookieArrays: Array<Array<string> | undefined>) {
        const cookieArray: Array<string> = []

        for (const arr of cookieArrays) {
            if (arr) {
                cookieArray.push(...arr)
            }
        }

        const obj: Record<string, string> = {}

        for (const cookie of cookieArray) {
            const name = cookie.split("=")[0]
            obj[name] = cookie
        }

        const result = Object.values(obj)

        return result
    }
}