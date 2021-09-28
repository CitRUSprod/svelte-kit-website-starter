export function isWordChars(str: string) {
    return /^\w*$/.test(str)
}

export function isEmail(str: string) {
    return /^[a-z\d][a-z\d.]*[a-z\d]@[a-z\d][a-z\d-]*[a-z\d]\.[a-z]{2,11}$/.test(str)
}
