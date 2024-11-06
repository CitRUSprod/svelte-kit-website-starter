/// <reference types="@sveltejs/kit" />

declare namespace App {
    type User = import("@local/schemas/models").user.User
    type Locales = import("$i18n/helpers").Locales
    type TranslationFunctions = import("$i18n/helpers").TranslationFunctions

    interface Locals {
        locale: Locales
        ll: TranslationFunctions
        tz: string
        userData: User | null
    }
}
