/// <reference types="@sveltejs/kit" />

declare namespace App {
    type Locales = import("$i18n/helpers").Locales
    type TranslationFunctions = import("$i18n/helpers").TranslationFun
    type User = import("$lib/types").User

    interface Locals {
        locale: Locales
        ll: TranslationFunctions
        userData: User | null
    }
}
