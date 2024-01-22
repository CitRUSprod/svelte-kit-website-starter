import * as constantsEnums from "@local/constants/enums"
import { RouteHandler } from "$/types"

export const getPermissions = (async () => ({
    payload: { items: Object.values(constantsEnums.Permission) }
})) satisfies RouteHandler
