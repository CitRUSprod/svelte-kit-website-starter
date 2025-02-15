<script lang="ts">
    import * as schemasRoutes from "@local/schemas/routes"
    import { dt } from "@local/utils"
    import * as _ from "lodash-es"
    import type { Split } from "type-fest"

    import { DialogPostCreating } from "./_components"

    import { ll, localePath, currentLocale } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Content, Button, TextField, DropdownMenu, SimplePagination } from "$lib/components"
    import { userData } from "$lib/stores"
    import type { DropdownMenuItem } from "$lib/types"
    import { createQueryController, qp } from "$lib/utils"

    type SortAndOrder =
        `${schemasRoutes.posts.GetPostsQuery["sort"]}-${schemasRoutes.posts.GetPostsQuery["order"]}`

    const { data } = $props()

    const paramSchemas = schemasRoutes.posts.getPostsQuery().shape

    const queryParams = qp.createStore({
        page: qp.param(paramSchemas.page),
        perPage: qp.param(paramSchemas.perPage),
        sort: qp.param(paramSchemas.sort),
        order: qp.param(paramSchemas.order),
        title: qp.param(paramSchemas.title.default(""))
    })

    let dialogPostCreating = $state<DialogPostCreating>()

    const sortings = $derived<Array<DropdownMenuItem<SortAndOrder>>>([
        { text: $ll.creationDateAsc(), value: "creationDate-asc" },
        { text: $ll.creationDateDesc(), value: "creationDate-desc" },
        { text: $ll.titleAsc(), value: "title-asc" },
        { text: $ll.titleDesc(), value: "title-desc" }
    ])

    const initialGetPostsParams = $state<{
        page: number
        perPage: number
        sortAndOrder: SortAndOrder
        title: string
    }>({
        page: $queryParams.page,
        perPage: $queryParams.perPage,
        sortAndOrder: `${$queryParams.sort}-${$queryParams.order}`,
        title: $queryParams.title
    })

    const qcGetPosts = createQueryController({
        initialData: data.itemsPage,
        params: initialGetPostsParams,
        async fn(params) {
            const [sort, order] = params.sortAndOrder.split("-") as Split<SortAndOrder, "-">

            const [res] = await Promise.all([
                api.posts.getPosts({
                    page: params.page,
                    perPage: params.perPage,
                    sort,
                    order,
                    title: params.title
                }),
                new Promise<void>(resolve => {
                    setTimeout(() => {
                        resolve()
                    }, 500)
                })
            ])

            return res
        }
    })

    async function refetchPage() {
        const [sort, order] = qcGetPosts.params.sortAndOrder.split("-") as Split<SortAndOrder, "-">

        $queryParams.page = qcGetPosts.params.page
        $queryParams.perPage = qcGetPosts.params.perPage
        $queryParams.sort = sort
        $queryParams.order = order
        $queryParams.title = qcGetPosts.params.title

        await qcGetPosts.refresh()
    }

    async function onTitleInput() {
        qcGetPosts.params.page = 1
        await refetchPage()
    }

    async function onSortingChange() {
        qcGetPosts.params.page = 1
        await refetchPage()
    }

    async function setPage(localPage: number) {
        qcGetPosts.params.page = localPage
        await refetchPage()
    }
</script>

<svelte:head>
    <title>{$ll.posts()}</title>
</svelte:head>

<Content.Default title={$ll.posts()}>
    <div class="u:flex u:justify-between u:gap-2">
        <div class="u:flex u:gap-2">
            <TextField
                label={$ll.search()}
                placeholder={$ll.enterTitle()}
                rightIconClass="u:i-material-symbols-search"
                bind:value={qcGetPosts.params.title}
                oninput={_.debounce(onTitleInput, 500)}
                data-testid="search-input"
            />
            <DropdownMenu
                items={sortings}
                label={$ll.sorting()}
                bind:value={qcGetPosts.params.sortAndOrder}
                onchange={onSortingChange}
            />
        </div>
        {#if $userData}
            <div>
                <Button
                    variant="success"
                    onclick={dialogPostCreating?.open}
                    data-testid="create-post-button"
                >
                    {$ll.createPost()}
                </Button>
            </div>
        {/if}
    </div>
    {#if $qcGetPosts.data}
        <div class="u:grid u:grid-cols-1 u:sm:grid-cols-2 u:lg:grid-cols-3 u:gap-4">
            {#each $qcGetPosts.data.items as post (post.id)}
                <a
                    class="u:p-4 u:border-primary u:rounded-lg u:border u:transition u:hover:bg-primary u:hover:bg-opacity-20 u:dark:hover:bg-opacity-20"
                    href={$localePath(`/posts/${String(post.id)}`)}
                    data-testid="post"
                >
                    <div>
                        <h3>{post.title}</h3>
                    </div>
                    <div>
                        <p class="u:truncate">{post.content}</p>
                    </div>
                    <div class="u:my-2 u:border-t u:border-primary"></div>
                    <div class="u:flex u:justify-between">
                        <span class="u:text-sm">
                            {$ll.author()}: {post.author?.username ??
                                `[${$ll.deleted().toUpperCase()}]`}
                        </span>
                        <span class="u:text-sm">
                            {dt.getFullDateAndTime(post.creationDate, data.tz, $currentLocale)}
                        </span>
                    </div>
                </a>
            {/each}
        </div>
        <div class="u:flex u:justify-center">
            <SimplePagination
                loading={$qcGetPosts.loading}
                page={$qcGetPosts.data.page}
                pages={$qcGetPosts.data.pages}
                onSetPage={page => setPage(page)}
                data-testid="posts-pagination"
            />
        </div>
    {/if}
</Content.Default>

<DialogPostCreating bind:this={dialogPostCreating} />
