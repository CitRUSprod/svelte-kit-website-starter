<script lang="ts" context="module">
    import { browser } from "$app/env"
    import { axios, qp } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"
    import type { Post, ItemsPage } from "$lib/types"

    interface QueryParams {
        perPage: number
        page: number
        sort: string
        order: string
        title: string
    }

    const defaultQuery: QueryParams = {
        perPage: 10,
        page: 1,
        sort: "creationDate",
        order: "asc",
        title: ""
    }

    async function getPostsPage(query: QueryParams) {
        const { data } = await axios.get<ItemsPage<Post>>("/api/posts", {
            params: qp.removeDefault(query, defaultQuery)
        })
        return data
    }

    export const load: Load = async ({ page: p }) => {
        if (browser) {
            const query = qp.get(
                p.query,
                defaultQuery,
                ["sort", "order", "title"],
                ["perPage", "page"]
            )
            const page = await getPostsPage(query)

            return {
                props: {
                    asyncData: { page, query }
                }
            }
        } else {
            return {}
        }
    }
</script>

<script lang="ts">
    import FaIcon from "svelte-fa"
    import { Button, CommonModal, CommonPagination } from "$lib/components"

    import * as _ from "lodash-es"
    import { faSearch } from "@fortawesome/free-solid-svg-icons"
    import { DateTime } from "luxon"
    import { toasts, session } from "$lib/stores"

    interface AsyncData {
        page: ItemsPage<Post>
        query: QueryParams
    }

    export let asyncData: AsyncData | null = null

    let itemsPerPage = defaultQuery.perPage

    const search = {
        title: defaultQuery.title
    }

    let sorting = `${defaultQuery.sort}-${defaultQuery.order}`

    function watchForAsyncData(data: AsyncData | null) {
        if (data) {
            itemsPerPage = data.query.perPage
            search.title = data.query.title
            sorting = `${data.query.sort}-${data.query.order}`
        }
    }

    $: watchForAsyncData(asyncData)

    async function updatePosts() {
        const page = await getPostsPage(asyncData!.query)
        asyncData!.page = page
        qp.setForCurrentPage(qp.removeDefault(asyncData!.query, defaultQuery))
    }

    async function onChangeItemsPerPage() {
        asyncData!.query.perPage = itemsPerPage
        asyncData!.query.page = 1
        await updatePosts()
    }

    async function onInputTitle() {
        asyncData!.query.title = search.title
        await updatePosts()
    }

    async function onChangeSorting() {
        const arr = sorting.split("-")
        asyncData!.query.sort = arr[0]
        asyncData!.query.order = arr[1]
        await updatePosts()
    }

    const modals = {
        postCreating: {
            visible: false,
            waiting: false,
            title: "",
            body: "",
            open(this: void) {
                modals.postCreating.title = ""
                modals.postCreating.body = ""
                modals.postCreating.visible = true
            },
            close(this: void) {
                modals.postCreating.visible = false
            },
            async save(this: void) {
                modals.postCreating.waiting = true

                try {
                    await axios.post<Post>("/api/posts", {
                        title: modals.postCreating.title,
                        body: modals.postCreating.body
                    })
                    await updatePosts()
                    toasts.add("success", "Post has been successfully created")
                    modals.postCreating.visible = false
                } catch (err: any) {
                    toasts.add("error", err.response?.data?.message ?? err.message)
                }

                modals.postCreating.waiting = false
            }
        }
    }

    function toShortStr(str: string) {
        const s = str.substr(0, 100).trimEnd()
        return s.length < str.length ? `${s}...` : str
    }
</script>

<svelte:head>
    <title>Posts</title>
</svelte:head>

{#if asyncData}
    <h1 class="text-4xl">Posts</h1>
    <div class="flex mt-4 space-x-2">
        <div class="relative w-full">
            <input
                class="input input-primary w-full pr-12"
                placeholder="Title"
                bind:value={search.title}
                on:input={_.debounce(onInputTitle, 500)}
            />
            <div class="absolute top-0 right-0 p-4 pointer-events-none">
                <FaIcon icon={faSearch} />
            </div>
        </div>
        <select class="select select-primary" bind:value={sorting} on:change={onChangeSorting}>
            <option value="creationDate-asc">Creation date (Earliest)</option>
            <option value="creationDate-desc">Creation date (Latest)</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
        </select>
        {#if $session.user}
            <Button class="btn-success" on:click={modals.postCreating.open}>New post</Button>
        {/if}
    </div>
    <div class="mt-4 space-y-4">
        {#each asyncData.page.items as post (post.id)}
            <div class="card bordered shadow-lg">
                <div class="card-body">
                    <h2 class="card-title">{post.title}</h2>
                    <p>{toShortStr(post.body)}</p>
                    <div class="card-actions justify-between items-center">
                        <div class="text-sm">
                            <div>
                                <b>Author:</b>
                                <a class="hover:underline" href="/users/{post.author.id}">
                                    {post.author.username}
                                </a>
                            </div>
                            <div>
                                <b>Created at:</b>
                                {DateTime.fromISO(post.creationDate).toFormat("yyyy-MM-dd HH:mm")}
                            </div>
                        </div>
                        <div>
                            <Button class="btn-primary" href="/posts/{post.id}">Open</Button>
                        </div>
                    </div>
                </div>
            </div>
        {:else}
            <h1 class="mt-10 text-2xl text-center">No posts</h1>
        {/each}
        {#if asyncData.page.items.length}
            <CommonPagination
                currentPage={asyncData.page.pageNumber}
                pageCount={asyncData.page.pageCount}
                pathname="/posts"
                query={asyncData.query}
                bind:itemsPerPage
                on:changeItemsPerPage={onChangeItemsPerPage}
            />
        {/if}
    </div>
    <CommonModal
        title="Post creating"
        persistent={modals.postCreating.waiting}
        bind:visible={modals.postCreating.visible}
    >
        <div class="form-control">
            <div class="label">
                <span class="label-text">Title:</span>
            </div>
            <input class="input input-bordered" bind:value={modals.postCreating.title} />
        </div>
        <div class="form-control">
            <div class="label">
                <span class="label-text">Body:</span>
            </div>
            <textarea
                class="textarea textarea-bordered h-64 resize-none"
                bind:value={modals.postCreating.body}
            />
        </div>
        <svelte:fragment slot="actions">
            <Button
                class="btn-success btn-sm"
                loading={modals.postCreating.waiting}
                disabled={!modals.postCreating.title || !modals.postCreating.body}
                on:click={modals.postCreating.save}
            >
                Create
            </Button>
            <Button
                class="btn-error btn-sm"
                disabled={modals.postCreating.waiting}
                on:click={modals.postCreating.close}
            >
                Cancel
            </Button>
        </svelte:fragment>
    </CommonModal>
{/if}
