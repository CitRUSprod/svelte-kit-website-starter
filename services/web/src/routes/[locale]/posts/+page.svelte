<script lang="ts">
    import { Content, Button, TextField, DropdownMenu, SimplePagination } from "$lib/components"
    import { ModalPostCreating } from "./_components"

    import * as _ from "lodash-es"
    import { onDestroy } from "svelte"
    import { useQuery } from "@sveltestack/svelte-query"
    import { t, localePath } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { qp, dt } from "$lib/utils"
    import * as api from "$lib/api"

    import type { DropdownMenuItem } from "$lib/types"
    import type { PageData } from "./$types"

    export let data: PageData

    let modalPostCreating: ModalPostCreating

    const params = {
        page: data.query.page,
        perPage: data.query.perPage,
        sortAndOrder: `${data.query.sort}-${data.query.order}`,
        title: data.query.title
    }

    const sortings: Array<DropdownMenuItem> = [
        { text: "Creation date (Earliest)", value: "creationDate-asc" },
        { text: "Creation date (Latest)", value: "creationDate-desc" },
        { text: "Title (A-Z)", value: "title-asc" },
        { text: "Title (Z-A)", value: "title-desc" }
    ]

    const queryGetPosts = useQuery("posts.getPosts", {
        initialData: data.itemsPage,
        async queryFn() {
            const [sort, order] = params.sortAndOrder.split("-")
            const res = await api.posts.getPosts(
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
            return res.data
        },
        onError(err: any) {
            if (err.response) {
                toasts.add("error", err.response.data.message)
            } else {
                toasts.add("error", "An error has occurred")
            }
        }
    })

    async function refetchPage() {
        const [sort, order] = params.sortAndOrder.split("-")
        qp.setForCurrentPage(
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
        await $queryGetPosts.refetch()
    }

    async function onTitleInput() {
        params.page = 1
        await refetchPage()
    }

    async function onSortingChange() {
        params.page = 1
        await refetchPage()
    }

    async function setPage(localPage: number) {
        params.page = localPage
        await refetchPage()
    }

    onDestroy(() => {
        $queryGetPosts.remove()
    })
</script>

<svelte:head>
    <title>{$t("routes.posts.posts")}</title>
</svelte:head>

<Content.Default title={$t("routes.posts.posts")}>
    <div class="u:flex u:justify-between u:gap-2">
        <div class="u:flex u:gap-2">
            <TextField
                label="Search"
                placeholder="Enter title..."
                rightIconClass="u:i-material-symbols-search"
                bind:value={params.title}
                on:input={_.debounce(onTitleInput, 500)}
            />
            <DropdownMenu
                items={sortings}
                label="Sorting"
                bind:value={params.sortAndOrder}
                on:change={onSortingChange}
            />
        </div>
        <div>
            <Button type="success" on:click={modalPostCreating.open}>
                {$t("routes.posts.create-post")}
            </Button>
        </div>
    </div>
    {#if $queryGetPosts.data}
        <div class="u:grid u:grid-cols-1 u:sm:grid-cols-2 u:lg:grid-cols-3 u:gap-4">
            {#each $queryGetPosts.data.items as post (post.id)}
                <a
                    class="u:p-4 u:border-primary u:rounded-lg u:border u:transition u:hover:bg-primary u:hover:bg-opacity-20 u:dark:hover:bg-opacity-20"
                    href={$localePath(`/posts/${post.id}`)}
                >
                    <div>
                        <h3>{post.title}</h3>
                    </div>
                    <div>
                        <p class="u:truncate">{post.content}</p>
                    </div>
                    <div class="u:my-2 u:border-t u:border-primary" />
                    <div class="u:flex u:justify-between">
                        <span class="u:text-sm">Author: {post.author.username}</span>
                        <span class="u:text-sm">{dt.getFullDateAndTime(post.creationDate)}</span>
                    </div>
                </a>
            {/each}
        </div>
        <div class="u:flex u:justify-center">
            <SimplePagination
                loading={$queryGetPosts.isFetching}
                page={$queryGetPosts.data.page}
                pages={$queryGetPosts.data.pages}
                on:setPage={e => setPage(e.detail)}
            />
        </div>
    {/if}
</Content.Default>

<ModalPostCreating bind:this={modalPostCreating} />
