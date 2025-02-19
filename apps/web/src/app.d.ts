/// <reference types="@sveltejs/kit" />

declare namespace App {
    type User = import("@repo/schemas/models").user.User
    type Locale = import("$i18n/helpers").Locale
    type TranslationFunctions = import("$i18n/helpers").TranslationFunctions

    interface Locals {
        locale: Locale
        ll: TranslationFunctions
        tz: string
        userData: User | null
    }
}
