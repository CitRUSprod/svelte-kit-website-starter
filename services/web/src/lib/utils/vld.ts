export function isWordChars(str: string) {
    return /^\w*$/.test(str)
}

export function isEqualT(str1: string, str2: string) {
    return str1.trim() === str2.trim()
}

export function isEqualTI(str1: string, str2: string) {
    return str1.trim().toLowerCase() === str2.trim().toLowerCase()
}
