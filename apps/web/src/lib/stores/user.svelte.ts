import * as schemasRoutes from "@repo/schemas/routes"

let data = $state<schemasRoutes.profile.$GetUserResponse | null>(null)

export const user = {
    get data() {
        return data
    },
    set data(v) {
        data = v
    }
}
