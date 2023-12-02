export function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function getRandomItem<T>(arr: Array<T>) {
    if (arr.length > 0) {
        const index = getRandomInt(0, arr.length - 1)
        return arr[index]
    } else {
        return null
    }
}
