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
        ["components/alert", undefined],
        ["components/chat", undefined],
        ["routes/_components/header", undefined],
        ["routes/error", undefined],
        ["routes/home", ["/"]],
        ["routes/simple-layout", ["/simple-layout"]],
        ["routes/chat/index", ["/chat"]],
        ["routes/posts/index", ["/posts"]],
        ["routes/posts/_components/modal-post-creating", ["/posts"]],
        ["routes/posts/[id]/index", [/^\/posts\/\d+$/]],
        ["routes/posts/[id]/_components/modal-post-editing", [/^\/posts\/\d+$/]],
        ["routes/posts/[id]/_components/modal-post-removing", [/^\/posts\/\d+$/]],
        ["routes/users/index", ["/users"]],
        ["routes/users/_components/modal-role-assigning", ["/users"]],
        ["routes/users/[id]/index", [/^\/users\/\d+$/]],
        ["routes/users/[id]/_components/modal-avatar-removing", [/^\/users\/\d+$/]],
        ["routes/users/[id]/_components/modal-password-changing", [/^\/users\/\d+$/]],
        ["routes/users/[id]/_components/modal-profile-editing", [/^\/users\/\d+$/]]
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
