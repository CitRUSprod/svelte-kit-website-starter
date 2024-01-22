import { ForbiddenError } from "http-errors-enhanced"
import { Prisma } from "@prisma/client"
import * as constantsEnums from "@local/constants/enums"
import * as schemasRoutes from "@local/schemas/routes"
import { getItemsPage, models } from "$/utils"
import { RouteHandler, UserData } from "$/types"

export const getPosts = (async (app, { query }) => {
    const page = await getItemsPage(query.page, query.perPage, async (skip, take) => {
        const where: Prisma.PostWhereInput = {
            title: { contains: query.title, mode: "insensitive" }
        }

        const totalItems = await app.prisma.post.count({ where })
        const posts = await app.prisma.post.findMany({
            skip,
            take,
            where,
            orderBy: { [query.sort ?? "creationDate"]: query.order },
            include: { author: { include: { role: true } } }
        })

        return { totalItems, items: posts.map(models.post.dto) }
    })

    return { payload: page }
}) satisfies RouteHandler<{ query: schemasRoutes.posts.GetPostsQuery }>

export const createPost = (async (app, { userData, body }) => {
    const post = await app.prisma.post.create({
        data: { ...body, authorId: userData.id, creationDate: new Date() },
        include: { author: { include: { role: true } } }
    })

    return { payload: models.post.dto(post) }
}) satisfies RouteHandler<{ userData: UserData; body: schemasRoutes.posts.CreatePostBody }>

export const getPost = (async (app, { params }) => {
    const post = await models.post.get(app, params.id)
    return { payload: models.post.dto(post) }
}) satisfies RouteHandler<{ params: schemasRoutes.posts.GetPostParams }>

export const updatePost = (async (app, { userData, params, body }) => {
    const post = await models.post.get(app, params.id)

    if (post.authorId === userData.id) {
        const updatedPost = await app.prisma.post.update({
            where: { id: params.id },
            data: { title: body.title, content: body.content, editingDate: new Date() },
            include: { author: { include: { role: true } } }
        })

        return { payload: models.post.dto(updatedPost) }
    } else {
        throw new ForbiddenError("No access")
    }
}) satisfies RouteHandler<{
    userData: UserData
    params: schemasRoutes.posts.UpdatePostParams
    body: schemasRoutes.posts.UpdatePostBody
}>

export const deletePost = (async (app, { userData, params }) => {
    const post = await models.post.get(app, params.id)

    if (
        post.authorId === userData.id ||
        userData.role.permissions.includes(constantsEnums.Permission.DeleteOtherUserPost)
    ) {
        const deletedPost = await app.prisma.post.delete({
            where: { id: params.id },
            include: { author: { include: { role: true } } }
        })

        return { payload: models.post.dto(deletedPost) }
    } else {
        throw new ForbiddenError("No access")
    }
}) satisfies RouteHandler<{ userData: UserData; params: schemasRoutes.posts.DeletePostParams }>
