// eslint-disable-next-line @typescript-eslint/naming-convention
import * as _ from "lodash-es"
import { redirect } from "@sveltejs/kit"

export async function load(e) {
    if (!e.locals.userData) {
        redirect(302, `/${e.params.locale as string}`)
    }

    const oAuthProvider = _.upperFirst(_.camelCase(e.params.provider))

    e.cookies.set("link-account", oAuthProvider, {
        path: "/",
        sameSite: "lax",
        httpOnly: false
    })

    redirect(302, `/${e.params.locale as string}/auth/login/${_.kebabCase(oAuthProvider)}`)
}
