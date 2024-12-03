import { ForbiddenError, InternalServerError } from "http-errors-enhanced"
import { Prisma } from "@prisma/client"
import * as constantsEnums from "@local/constants/enums"
import * as schemasRoutes from "@local/schemas/routes"
import { getItemsPage, models } from "$/utils"
import { RouteHandler } from "$/types"

export const getPosts = (async (app, req) => {
    const page = await getItemsPage(req.query.page, req.query.perPage, async (skip, take) => {
        const where: Prisma.PostWhereInput = {
            title: { contains: req.query.title, mode: "insensitive" }
        }

        const totalItems = await app.prisma.post.count({ where })
        const posts = await app.prisma.post.findMany({
            skip,
            take,
            where,
            orderBy: { [req.query.sort]: req.query.order },
            include: { author: { include: { role: true } } }
        })

        return { totalItems, items: posts.map(models.post.dto) }
    })

    return { payload: page }
}) satisfies RouteHandler<
    { Querystring: schemasRoutes.posts.GetPostsQuery },
    schemasRoutes.posts.GetPostsResponse
>

export const createPost = (async (app, req) => {
    if (!req.userData) {
        throw new InternalServerError(req.ll.unexpectedError())
    }

    const post = await app.prisma.post.create({
        data: { ...req.body, authorId: req.userData.id, creationDate: new Date() },
        include: { author: { include: { role: true } } }
    })

    return { payload: models.post.dto(post) }
}) satisfies RouteHandler<
    { Body: schemasRoutes.posts.CreatePostBody },
    schemasRoutes.posts.CreatePostResponse
>

export const getPost = (async (app, req) => {
    const post = await models.post.get(app, req, req.params.id)
    return { payload: models.post.dto(post) }
}) satisfies RouteHandler<
    { Params: schemasRoutes.posts.GetPostParams },
    schemasRoutes.posts.GetPostResponse
>

export const updatePost = (async (app, req) => {
    if (!req.userData) {
        throw new InternalServerError(req.ll.unexpectedError())
    }

    const post = await models.post.get(app, req, req.params.id)

    if (post.authorId === req.userData.id) {
        const updatedPost = await app.prisma.post.update({
            where: { id: req.params.id },
            data: { title: req.body.title, content: req.body.content, editingDate: new Date() },
            include: { author: { include: { role: true } } }
        })

        return { payload: models.post.dto(updatedPost) }
    } else {
        throw new ForbiddenError(req.ll.noAccess())
    }
}) satisfies RouteHandler<
    {
        Params: schemasRoutes.posts.UpdatePostParams
        Body: schemasRoutes.posts.UpdatePostBody
    },
    schemasRoutes.posts.UpdatePostResponse
>

export const deletePost = (async (app, req) => {
    if (!req.userData) {
        throw new InternalServerError(req.ll.unexpectedError())
    }

    const post = await models.post.get(app, req, req.params.id)

    if (
        post.authorId === req.userData.id ||
        req.userData.role.permissions.includes(constantsEnums.Permission.DeleteOtherUserPost)
    ) {
        const deletedPost = await app.prisma.post.delete({
            where: { id: req.params.id },
            include: { author: { include: { role: true } } }
        })

        return { payload: models.post.dto(deletedPost) }
    } else {
        throw new ForbiddenError(req.ll.noAccess())
    }
}) satisfies RouteHandler<
    { Params: schemasRoutes.posts.DeletePostParams },
    schemasRoutes.posts.DeletePostResponse
>
