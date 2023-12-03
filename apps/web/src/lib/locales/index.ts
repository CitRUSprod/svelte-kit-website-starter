import { derived } from "svelte/store"
import I18n, { type Config } from "sveltekit-i18n"

export const defaultLocale = "en" as string

const localeList = ["en", "ru"]

function createLocaleLoaders(path: string, routes: NonNullable<Config["loaders"]>[0]["routes"]) {
    const parts = path.split("/")

    const componentPartIndex = parts.indexOf("_components")

    if (componentPartIndex >= 0) {
        parts.splice(0, componentPartIndex)
        parts[0] = "components"
    }

    if (parts[parts.length - 1] === "index") {
        parts.length -= 1
    }

    const loaders: Config["loaders"] = localeList.map(locale => ({
        locale,
        key: parts.join("."),
        routes,
        loader: async () => (await import(`./${locale}/${path}.json`)).default
    }))

    return loaders
}

function createAllLoaders(...args: Array<[string, NonNullable<Config["loaders"]>[0]["routes"]]>) {
    const loaders: Config["loaders"] = []

    for (const arg of args) {
        loaders.push(...createLocaleLoaders(...arg))
    }

    return loaders
}

const config: Config = {
    loaders: createAllLoaders(
        ["global", undefined],
        ["components/alert", undefined],
        ["components/chat", undefined],
        ["routes/_components/header", undefined],
        ["routes/error", undefined],
        ["routes/home", ["/"]],
        ["routes/chat", ["/chat"]],
        ["routes/simple-layout", ["/simple-layout"]],
        ["routes/auth/login", ["/auth/login"]],
        ["routes/auth/logout", ["/auth/logout"]],
        ["routes/auth/registration", ["/auth/registration"]],
        ["routes/profile/email/[token]", [/^\/profile\/email\/[-\da-f]+$/]],
        ["routes/profile/password/index", ["/profile/password"]],
        ["routes/profile/password/[token]", [/^\/profile\/password\/[-\da-f]+$/]],
        ["routes/posts/index", ["/posts"]],
        ["routes/posts/_components/dialog-post-creating", ["/posts"]],
        ["routes/posts/[id]/index", [/^\/posts\/\d+$/]],
        ["routes/posts/[id]/_components/dialog-post-editing", [/^\/posts\/\d+$/]],
        ["routes/posts/[id]/_components/dialog-post-removing", [/^\/posts\/\d+$/]],
        ["routes/users/index", ["/users"]],
        ["routes/users/_components/dialog-role-assigning", ["/users"]],
        ["routes/users/[id]/index", [/^\/users\/\d+$/]],
        ["routes/users/[id]/_components/dialog-avatar-removing", [/^\/users\/\d+$/]],
        ["routes/users/[id]/_components/dialog-password-changing", [/^\/users\/\d+$/]],
        ["routes/users/[id]/_components/dialog-profile-editing", [/^\/users\/\d+$/]],
        ["routes/roles/index", ["/roles"]],
        ["routes/roles/_components/dialog-role-creating", ["/roles"]],
        ["routes/roles/_components/dialog-role-editing", ["/roles"]],
        ["routes/roles/_components/dialog-role-removing", ["/roles"]]
    )
}

const { t, locale: lcl, locales, loadTranslations } = new I18n(config)

export { t, locales, loadTranslations }

export const currentLocale = {
    subscribe: lcl.subscribe,
    get: lcl.get
}

export const localePath = derived(
    currentLocale,
    l => (path: string, locale?: string) => `/${locale ?? l}${path === "/" ? "" : path}`
)
