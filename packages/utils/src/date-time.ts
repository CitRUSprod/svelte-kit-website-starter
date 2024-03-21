import dayjs from "dayjs"
import utc from "dayjs/plugin/utc.js"
import timezone from "dayjs/plugin/timezone.js"

import "dayjs/locale/ru.js"
import "dayjs/locale/en.js"

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.locale("en")

export { dayjs }

export function getFullDateAndTime(
    date: string | number | Date | dayjs.Dayjs,
    tz: string,
    locale: string
) {
    const d = dayjs(date).tz(tz)

    switch (locale) {
        case "ru": {
            return d.locale("ru").format("DD.MM.YYYY HH:mm")
        }

        default: {
            return d.format("DD/MM/YYYY HH:mm")
        }
    }
}

export function getFullDate(
    date: string | number | Date | dayjs.Dayjs,
    tz: string,
    locale: string
) {
    const d = dayjs(date).tz(tz)

    switch (locale) {
        case "ru": {
            return d.locale("ru").format("D MMMM YYYY")
        }

        default: {
            return d.format("MMMM D, YYYY")
        }
    }
}
