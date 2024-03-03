/// <reference types="@sveltejs/kit" />

declare namespace App {
    type Locales = import("$i18n/i18n-types").Locales
    type TranslationFunctions = import("$i18n/i18n-types").TranslationFun
    type User = import("$lib/types").User

    interface Locals {
        locale: Locales
        ll: TranslationFunctions
        userData: User | null
    }
}
