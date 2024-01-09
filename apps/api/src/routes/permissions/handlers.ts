import { RouteHandler } from "$/types"
import * as enums from "$/enums"

export const getPermissions = (async () => ({
    payload: { items: Object.values(enums.Permission) }
})) satisfies RouteHandler
