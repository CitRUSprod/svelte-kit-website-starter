import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone.js"
import utc from "dayjs/plugin/utc.js"

// eslint-disable-next-line import/no-unassigned-import
import "dayjs/locale/ru.js"
// eslint-disable-next-line import/no-unassigned-import
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
