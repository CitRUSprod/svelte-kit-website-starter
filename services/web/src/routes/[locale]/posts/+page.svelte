<script lang="ts">
    import { Content, Button, TextField, DropdownMenu, SimplePagination } from "$lib/components"
    import { ModalPostCreating } from "./_components"

    import * as _ from "lodash-es"
    import { t, localePath, currentLocale } from "$lib/locales"
    import { createQueryController, qp, dt } from "$lib/utils"
    import * as api from "$lib/api"

    import type { DropdownMenuItem } from "$lib/types"

    export let data

    let modalPostCreating: ModalPostCreating

    let sortings: Array<DropdownMenuItem>
    $: sortings = [
        { text: $t("routes.posts.creation-date-asc"), value: "creationDate-asc" },
        { text: $t("routes.posts.creation-date-desc"), value: "creationDate-desc" },
        { text: $t("routes.posts.title-asc"), value: "title-asc" },
        { text: $t("routes.posts.title-desc"), value: "title-desc" }
    ]

    const qcGetPosts = createQueryController({
        initialData: data.itemsPage,
        params: {
            page: data.query.page,
            perPage: data.query.perPage,
            sortAndOrder: `${data.query.sort as string}-${data.query.order as string}`,
            title: data.query.title
        },
        fn(params) {
            const [sort, order] = params.sortAndOrder.split("-")
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

    function watchForData(d: typeof data) {
        qcGetPosts.params.page = d.query.page
        qcGetPosts.params.perPage = d.query.perPage
        qcGetPosts.params.sortAndOrder = `${d.query.sort as string}-${d.query.order as string}`
        qcGetPosts.params.title = d.query.title
        $qcGetPosts.data = d.itemsPage
    }

    $: watchForData(data)

    async function refetchPage() {
        const [sort, order] = qcGetPosts.params.sortAndOrder.split("-")
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
    <title>{$t("routes.posts.posts")}</title>
</svelte:head>

<Content.Default title={$t("routes.posts.posts")}>
    <div class="u:flex u:justify-between u:gap-2">
        <div class="u:flex u:gap-2">
            <TextField
                label={$t("routes.posts.search")}
                placeholder={$t("routes.posts.enter-title")}
                rightIconClass="u:i-material-symbols-search"
                bind:value={qcGetPosts.params.title}
                on:input={_.debounce(onTitleInput, 500)}
            />
            <DropdownMenu
                items={sortings}
                label={$t("routes.posts.sorting")}
                bind:value={qcGetPosts.params.sortAndOrder}
                on:change={onSortingChange}
            />
        </div>
        <div>
            <Button type="success" on:click={modalPostCreating.open}>
                {$t("routes.posts.create-post")}
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
                    <div class="u:my-2 u:border-t u:border-primary" />
                    <div class="u:flex u:justify-between">
                        <span class="u:text-sm">
                            {$t("routes.posts.author")}: {post.author.username}
                        </span>
                        <span class="u:text-sm">
                            {dt.getFullDateAndTime(post.creationDate, $currentLocale)}
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
                on:setPage={e => setPage(e.detail)}
            />
        </div>
    {/if}
</Content.Default>

<ModalPostCreating bind:this={modalPostCreating} />
