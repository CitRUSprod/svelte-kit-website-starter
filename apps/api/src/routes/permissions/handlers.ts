import { RouteHandler } from "$/types"
import * as enums from "$/enums"

export const getPermissions: RouteHandler = async () => ({
    payload: { items: Object.values(enums.Permission) }
})
