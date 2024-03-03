import { isLocale } from "$i18n/i18n-util"

export function match(param) {
    return isLocale(param)
}
