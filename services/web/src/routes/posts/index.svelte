<script lang="ts" context="module">
    import { fetchy, HttpError, qp, dt } from "$lib/utils"

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

    async function getPostsPage(query: QueryParams, f?: typeof fetch) {
        const res = await fetchy.get("/api/posts", {
            searchParams: new URLSearchParams(qp.removeDefault(query, defaultQuery) as any),
            fetch: f
        })
        const data: ItemsPage<Post> = await res.json()
        return data
    }

    export const load: Load = async ({ page: p, fetch: f }) => {
        const query = qp.get(p.query, defaultQuery, ["sort", "order", "title"], ["perPage", "page"])

        const page = await getPostsPage(query, f)

        return {
            props: { page, query }
        }
    }
</script>

<script lang="ts">
    import FaIcon from "svelte-fa"
    import { Button, CommonModal, CommonPagination } from "$lib/components"

    import * as _ from "lodash-es"
    import * as yup from "yup"
    import { faSearch } from "@fortawesome/free-solid-svg-icons"
    import { toasts, session } from "$lib/stores"

    export let page: ItemsPage<Post>
    export let query: QueryParams

    let itemsPerPage = query.perPage

    const search = {
        title: query.title
    }

    let sorting = `${query.sort}-${query.order}`

    async function updatePostsPage() {
        page = await getPostsPage(query)
        qp.setForCurrentPage(qp.removeDefault(query, defaultQuery))
    }

    async function onChangeItemsPerPage() {
        query.perPage = itemsPerPage
        query.page = 1
        await updatePostsPage()
    }

    async function onInputTitle() {
        query.title = search.title.trim()
        await updatePostsPage()
    }

    async function onChangeSorting() {
        const arr = sorting.split("-")
        query.sort = arr[0]
        query.order = arr[1]
        await updatePostsPage()
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
                    await fetchy.post("/api/posts", {
                        json: {
                            title: modals.postCreating.title.trim(),
                            body: modals.postCreating.body.trim()
                        }
                    })
                    await updatePostsPage()
                    toasts.add("success", "Post has been successfully created")
                    modals.postCreating.visible = false
                } catch (err: unknown) {
                    if (err instanceof HttpError) {
                        const data = await err.response.json()
                        toasts.add("error", data.message)
                    } else {
                        console.error(err)
                    }
                }

                modals.postCreating.waiting = false
            }
        }
    }

    $: validators = {
        completedPostCreatingModal:
            yup.string().trim().min(2).max(255).required().isValidSync(modals.postCreating.title) &&
            yup.string().trim().min(2).required().isValidSync(modals.postCreating.body)
    }

    function toShortStr(str: string) {
        const s = str.substring(0, 100).trimEnd()
        return s.length < str.length ? `${s}...` : str
    }
</script>

<svelte:head>
    <title>Posts</title>
</svelte:head>

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
    {#each page.items as post (post.id)}
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
                            {dt.getFullDateAndTime(post.creationDate)}
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
    {#if page.items.length}
        <CommonPagination
            currentPage={page.pageNumber}
            pageCount={page.pageCount}
            pathname="/posts"
            {query}
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
        <input
            class="input input-bordered"
            disabled={modals.postCreating.waiting}
            bind:value={modals.postCreating.title}
        />
    </div>
    <div class="form-control">
        <div class="label">
            <span class="label-text">Body:</span>
        </div>
        <textarea
            class="textarea textarea-bordered h-64 resize-none"
            disabled={modals.postCreating.waiting}
            bind:value={modals.postCreating.body}
        />
    </div>
    <svelte:fragment slot="actions">
        <Button
            class="btn-success btn-sm"
            loading={modals.postCreating.waiting}
            disabled={!validators.completedPostCreatingModal}
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
