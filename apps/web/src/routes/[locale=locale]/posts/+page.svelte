<script lang="ts">
    import { Content, Button, TextField, DropdownMenu, SimplePagination } from "$lib/components"
    import { DialogPostCreating } from "./_components"

    import * as lodash from "lodash-es"
    import * as schemasRoutes from "@local/schemas/routes"
    import { dt } from "@local/utils"
    import { ll, localePath, currentLocale } from "$i18n/helpers"
    import { createQueryController, qp } from "$lib/utils"
    import * as api from "$lib/api"

    import type { DropdownMenuItem } from "$lib/types"

    const { data } = $props()

    let dialogPostCreating = $state<DialogPostCreating>()

    const sortings: Array<DropdownMenuItem> = $derived([
        { text: $ll.creationDateAsc(), value: "creationDate-asc" },
        { text: $ll.creationDateDesc(), value: "creationDate-desc" },
        { text: $ll.titleAsc(), value: "title-asc" },
        { text: $ll.titleDesc(), value: "title-desc" }
    ])

    const qcGetPosts = $state(
        createQueryController({
            initialData: data.itemsPage,
            params: {
                page: data.query.page,
                perPage: data.query.perPage,
                sortAndOrder: `${data.query.sort as string}-${data.query.order as string}`,
                title: data.query.title
            },
            fn(params) {
                const [sort, order] = params.sortAndOrder.split("-") as [
                    schemasRoutes.posts.GetPostsQuery["sort"],
                    schemasRoutes.posts.GetPostsQuery["order"]
                ]
                return api.posts.getPosts(
                    qp.removeDefault(
                        {
                            page: params.page,
                            perPage: params.perPage,
                            sort,
                            order,
                            title: params.title
                        },
                        data.defaultQuery
                    )
                )
            }
        })
    )

    function watchForData(d: typeof data) {
        qcGetPosts.params.page = d.query.page
        qcGetPosts.params.perPage = d.query.perPage
        qcGetPosts.params.sortAndOrder = `${d.query.sort as string}-${d.query.order as string}`
        qcGetPosts.params.title = d.query.title
        $qcGetPosts.data = d.itemsPage
    }

    $effect(() => {
        watchForData(data)
    })

    async function refetchPage() {
        const [sort, order] = qcGetPosts.params.sortAndOrder.split("-") as [
            schemasRoutes.posts.GetPostsQuery["sort"],
            schemasRoutes.posts.GetPostsQuery["order"]
        ]
        qp.setForCurrentPage(
            qp.removeDefault(
                {
                    page: qcGetPosts.params.page,
                    perPage: qcGetPosts.params.perPage,
                    sort,
                    order,
                    title: qcGetPosts.params.title
                },
                data.defaultQuery
            )
        )
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
                oninput={lodash.debounce(onTitleInput, 500)}
            />
            <DropdownMenu
                items={sortings}
                label={$ll.sorting()}
                bind:value={qcGetPosts.params.sortAndOrder}
                onchange={onSortingChange}
            />
        </div>
        <div>
            <Button variant="success" onclick={dialogPostCreating?.open}>
                {$ll.createPost()}
            </Button>
        </div>
    </div>
    {#if $qcGetPosts.data}
        <div class="u:grid u:grid-cols-1 u:sm:grid-cols-2 u:lg:grid-cols-3 u:gap-4">
            {#each $qcGetPosts.data.items as post (post.id)}
                <a
                    class="u:p-4 u:border-primary u:rounded-lg u:border u:transition u:hover:bg-primary u:hover:bg-opacity-20 u:dark:hover:bg-opacity-20"
                    href={$localePath(`/posts/${String(post.id)}`)}
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
            />
        </div>
    {/if}
</Content.Default>

<DialogPostCreating bind:this={dialogPostCreating} />
