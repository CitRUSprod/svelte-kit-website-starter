import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { FastifyAuthFunction } from "@fastify/auth"
import { ForbiddenError, InternalServerError } from "http-errors-enhanced"
import * as constantsEnums from "@local/constants/enums"
import { models } from "$/utils"

declare module "fastify" {
    interface FastifyInstance {
        verifyPermission(permission: constantsEnums.Permission): FastifyAuthFunction
    }
}

export const verifyPermission: FastifyPluginCallback = (app, options, done) => {
    app.decorate<FastifyInstance["verifyPermission"]>(
        "verifyPermission",
        permission => async req => {
            if (!req.userData) throw new InternalServerError(req.ll.unexpectedError())

            const { role } = await models.user.get(app, req, req.userData.id)
            const allowed = role.permissions.includes(permission)
            if (!allowed) throw new ForbiddenError(req.ll.noAccess())
        }
    )

    done()
}
