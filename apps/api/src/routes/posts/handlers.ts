import * as constantsEnums from "@repo/constants/enums"
import * as schemasRoutes from "@repo/schemas/routes"
import { ForbiddenError, InternalServerError } from "http-errors-enhanced"

import { Prisma } from "$/prisma/generated/client"
import { defineRouteHandler, getItemsPage, models } from "$/utils"

export const getPosts = defineRouteHandler<
    { Querystring: schemasRoutes.posts.$GetPostsQuery },
    schemasRoutes.posts.$GetPostsResponse
>(async (app, req) => {
    const page = await getItemsPage(req.query.page, req.query.perPage, async (skip, take) => {
        const where: Prisma.PostWhereInput = {
            title: req.query.title ? { contains: req.query.title, mode: "insensitive" } : undefined
        }

        const totalItems = await app.prisma.post.count({ where })
        const posts = await app.prisma.post.findMany({
            skip,
            take,
            where,
            orderBy: { [req.query.sort]: req.query.order },
            include: models.post.include
        })

        return { totalItems, items: posts.map(models.post.dto) }
    })

    return {
        payload: page
    }
})

export const createPost = defineRouteHandler<
    { Body: schemasRoutes.posts.$CreatePostBody },
    schemasRoutes.posts.$CreatePostResponse
>(async (app, req) => {
    if (!req.userData) {
        throw new InternalServerError(req.ll.unexpectedError())
    }

    const post = await app.prisma.post.create({
        data: { ...req.body, authorId: req.userData.id, creationDate: new Date() },
        include: models.post.include
    })

    return {
        payload: models.post.dto(post)
    }
})

export const getPost = defineRouteHandler<
    { Params: schemasRoutes.posts.$GetPostParams },
    schemasRoutes.posts.$GetPostResponse
>(async (app, req) => {
    const post = await models.post.get(app, req, req.params.id)

    return {
        payload: models.post.dto(post)
    }
})

export const updatePost = defineRouteHandler<
    {
        Params: schemasRoutes.posts.$UpdatePostParams
        Body: schemasRoutes.posts.$UpdatePostBody
    },
    schemasRoutes.posts.$UpdatePostResponse
>(async (app, req) => {
    if (!req.userData) {
        throw new InternalServerError(req.ll.unexpectedError())
    }

    const post = await models.post.get(app, req, req.params.id)

    if (post.authorId !== req.userData.id) {
        throw new ForbiddenError(req.ll.noAccess())
    }

    const updatedPost = await app.prisma.post.update({
        where: { id: req.params.id },
        data: { title: req.body.title, content: req.body.content, editingDate: new Date() },
        include: models.post.include
    })

    return {
        payload: models.post.dto(updatedPost)
    }
})

export const deletePost = defineRouteHandler<
    { Params: schemasRoutes.posts.$DeletePostParams },
    schemasRoutes.posts.$DeletePostResponse
>(async (app, req) => {
    if (!req.userData) {
        throw new InternalServerError(req.ll.unexpectedError())
    }

    const post = await models.post.get(app, req, req.params.id)

    if (
        post.authorId !== req.userData.id &&
        !req.userData.role.permissions.includes(constantsEnums.Permission.DeleteOtherUserPost)
    ) {
        throw new ForbiddenError(req.ll.noAccess())
    }

    const deletedPost = await app.prisma.post.delete({
        where: { id: req.params.id },
        include: models.post.include
    })

    return {
        payload: models.post.dto(deletedPost)
    }
})
