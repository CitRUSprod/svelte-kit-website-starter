<script lang="ts">
    import * as schemasRoutes from "@local/schemas/routes"
    import { dt } from "@local/utils"
    import * as _ from "lodash-es"
    import type { Split } from "type-fest"

    import { DialogPostCreating } from "./_components"

    import { ll, localePath, currentLocale } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Content, Button, TextField, Select, SimplePagination } from "$lib/components"
    import { useQueryParams, useQuery } from "$lib/hooks"
    import { userData } from "$lib/stores"

    type SortAndOrder =
        `${schemasRoutes.posts.GetPostsQuery["sort"]}-${schemasRoutes.posts.GetPostsQuery["order"]}`

    const { data } = $props()

    const paramSchemas = schemasRoutes.posts.getPostsQuery().shape

    const queryParams = useQueryParams({
        page: paramSchemas.page,
        perPage: paramSchemas.perPage,
        sort: paramSchemas.sort,
        order: paramSchemas.order,
        title: paramSchemas.title.transform(v => v ?? "")
    })

    let dialogPostCreating = $state<DialogPostCreating>()

    const sortings = $derived<Array<{ text: string; value: SortAndOrder }>>([
        { text: $ll.creationDateAsc(), value: "creationDate-asc" },
        { text: $ll.creationDateDesc(), value: "creationDate-desc" },
        { text: $ll.titleAsc(), value: "title-asc" },
        { text: $ll.titleDesc(), value: "title-desc" }
    ])

    const sortAndOrder = {
        get value(): SortAndOrder {
            return `${queryParams.sort}-${queryParams.order}`
        },
        set value(v) {
            const [sort, order] = v.split("-") as Split<SortAndOrder, "-">
            queryParams.sort = sort
            queryParams.order = order
        }
    }

    const qGetPosts = useQuery({
        initialData: data.itemsPage,
        minResponseTime: 500,
        fn() {
            return api.posts.getPosts({
                page: queryParams.page,
                perPage: queryParams.perPage,
                sort: queryParams.sort,
                order: queryParams.order,
                title: queryParams.title
            })
        }
    })

    async function onTitleInput() {
        queryParams.page = 1
        await qGetPosts.refetch()
    }

    async function onSortingChange() {
        queryParams.page = 1
        await qGetPosts.refetch()
    }

    async function setPage(localPage: number) {
        queryParams.page = localPage
        await qGetPosts.refetch()
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
                bind:value={queryParams.title}
                oninput={_.debounce(onTitleInput, 500)}
                data-testid="search-input"
            />
            <Select
                items={sortings}
                label={$ll.sorting()}
                bind:value={sortAndOrder.value}
                onChange={onSortingChange}
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
    {#if qGetPosts.data}
        <div class="u:grid u:grid-cols-1 u:sm:grid-cols-2 u:lg:grid-cols-3 u:gap-4">
            {#each qGetPosts.data.items as post (post.id)}
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
                loading={qGetPosts.loading}
                page={qGetPosts.data.page}
                pages={qGetPosts.data.pages}
                onSetPage={page => setPage(page)}
                data-testid="posts-pagination"
            />
        </div>
    {/if}
</Content.Default>

<DialogPostCreating bind:this={dialogPostCreating} />
