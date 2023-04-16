import { DateTime } from "luxon"
import { browser } from "$app/environment"

export function getFullDateAndTime(date: string, locale: string) {
    if (browser) {
        const dt = DateTime.fromISO(date)

        switch (locale) {
            case "ru": {
                return dt.toFormat("dd.MM.yyyy HH:mm")
            }

            default: {
                return dt.toFormat("dd/MM/yyyy HH:mm")
            }
        }
    } else {
        return ""
    }
}

export function getFullDate(date: string, locale: string) {
    if (browser) {
        const dt = DateTime.fromISO(date)

        switch (locale) {
            case "ru": {
                return dt.toFormat("d LLLL yyyy", { locale: "ru" })
            }

            default: {
                return dt.toFormat("LLLL d, yyyy")
            }
        }
    } else {
        return ""
    }
}
