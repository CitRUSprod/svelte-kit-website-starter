import type { Page } from "@sveltejs/kit"

export function getRedirectLoadOutput(path: string | Page) {
    return {
        status: 302,
        redirect: path instanceof Object ? `${path.path}?${path.query.toString()}` : path
    }
}
