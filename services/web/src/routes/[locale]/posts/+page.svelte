<script lang="ts">
    import { Content, Button, TextField, SimplePagination } from "$lib/components"
    import { ModalPostCreating } from "./_components"

    import * as _ from "lodash-es"
    import { onDestroy } from "svelte"
    import { useQuery } from "@sveltestack/svelte-query"
    import { t, localePath } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { qp } from "$lib/utils"
    import * as api from "$lib/api"

    import type { PageData } from "./$types"

    export let data: PageData

    let modalPostCreating: ModalPostCreating

    const pagination = {
        page: data.query.page
    }

    const filters = {
        title: data.query.title
    }

    const queryGetPosts = useQuery("posts.getPosts", {
        initialData: data.itemsPage,
        async queryFn() {
            const res = await api.posts.getPosts(
                qp.removeDefault(
                    {
                        page: pagination.page,
                        title: filters.title
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
        qp.setForCurrentPage({ page: pagination.page, title: filters.title })
        await $queryGetPosts.refetch()
    }

    async function setPage(localPage: number) {
        pagination.page = localPage
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
        <TextField
            label="Search"
            placeholder="Enter title..."
            rightIconClass="u:i-material-symbols-search"
            bind:value={filters.title}
            on:input={_.debounce(refetchPage, 500)}
        />
        <Button type="success" on:click={modalPostCreating.open}>
            {$t("routes.posts.create-post")}
        </Button>
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
