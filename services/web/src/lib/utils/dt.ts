import { DateTime } from "luxon"

export function getFullDateAndTime(date: string) {
    return DateTime.fromISO(date).toFormat("yyyy-MM-dd HH:mm")
}

export function getFullDate(date: string) {
    return DateTime.fromISO(date).toFormat("LLLL d, yyyy")
}
