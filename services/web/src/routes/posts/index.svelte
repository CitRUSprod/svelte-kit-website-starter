<script lang="ts" context="module">
    import { browser } from "$app/env"
    import { axios, setQueryParams } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"
    import type { Post, ItemsPage } from "$lib/types"

    interface QueryParams {
        page?: string
        sort?: string
        order?: string
        title?: string
        [key: string]: string | undefined
    }

    async function getPostsPage(query: QueryParams) {
        const { data } = await axios.get<ItemsPage<Post>>("/api/posts", {
            params: {
                page: query.page,
                sort: query.sort,
                order: query.order,
                title: query.title
            }
        })
        const { items, ...pagination } = data
        return { items, pagination }
    }

    export const load: Load = async ({ page }) => {
        if (browser) {
            const { items, pagination } = await getPostsPage({
                page: page.query.get("page") ?? undefined,
                sort: page.query.get("sort") ?? undefined,
                order: page.query.get("order") ?? undefined,
                title: page.query.get("title") ?? undefined
            })
            return { props: { posts: items, pagination } }
        } else {
            return {}
        }
    }
</script>

<script lang="ts">
    import FaIcon from "svelte-fa"
    import { Button, Modal, Pagination } from "$lib/components"

    import {
        faAngleDoubleLeft,
        faAngleDoubleRight,
        faAngleLeft,
        faAngleRight,
        faSearch
    } from "@fortawesome/free-solid-svg-icons"
    import { DateTime } from "luxon"
    import { toasts, session } from "$lib/stores"

    export let posts: Array<Post> = []
    export let pagination: Omit<ItemsPage, "items"> | null = null

    async function updatePosts(query: QueryParams) {
        const { items, pagination: p } = await getPostsPage({
            page: query.page,
            sort: query.sort,
            order: query.order,
            title: query.title
        })
        posts = items
        pagination = p

        setQueryParams(query)
    }

    function toShortStr(str: string) {
        const s = str.substr(0, 100).trimEnd()
        return s.length < str.length ? `${s}...` : str
    }

    const search = {
        title: ""
    }

    let sortingValue = "creationDate-asc"

    function sortingToObject(value: string) {
        const arr = value.split("-")
        return { sort: arr[0], order: arr[1] }
    }

    $: sorting = sortingToObject(sortingValue)

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
                    const { data } = await axios.post<Post>("/api/posts", {
                        title: modals.postCreating.title,
                        body: modals.postCreating.body
                    })
                    posts.push(data)
                    posts = posts
                    toasts.add("success", "Post has been successfully created")
                    modals.postCreating.visible = false
                } catch (err: any) {
                    toasts.add("error", err.response?.data?.message ?? err.message)
                }

                modals.postCreating.waiting = false
            }
        }
    }
</script>

<svelte:head>
    <title>Posts</title>
</svelte:head>

<h1 class="text-4xl">Posts</h1>
{#if $session.user}
    <div class="flex mt-4 space-x-2">
        <div class="relative w-full">
            <input
                class="input input-primary input-bordered w-full pr-14"
                placeholder="Title"
                bind:value={search.title}
            />
            <div class="absolute top-0 right-0">
                <Button
                    class="btn-primary rounded-l-none"
                    on:click={() =>
                        updatePosts({
                            page: "1",
                            sort: sorting.sort,
                            order: sorting.order,
                            title: search.title
                        })}
                >
                    <FaIcon icon={faSearch} />
                </Button>
            </div>
        </div>
        <select
            class="select select-primary select-bordered"
            bind:value={sortingValue}
            on:change={() => {
                setTimeout(() => {
                    updatePosts({
                        page: "1",
                        sort: sorting.sort,
                        order: sorting.order,
                        title: search.title
                    })
                })
            }}
        >
            <option value="creationDate-asc">Creation date (Earliest)</option>
            <option value="creationDate-desc">Creation date (Latest)</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
        </select>
        <Button class="btn-success" on:click={modals.postCreating.open}>New post</Button>
    </div>
{/if}
<div class="mt-4 space-y-4">
    {#each posts as post (post.id)}
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
    {#if pagination && posts.length}
        <Pagination
            class="btn-group justify-center"
            currentPage={pagination.pageNumber}
            pageCount={pagination.pageCount}
            let:pageNumber
        >
            <Button href="/posts?page=1" disabled={pagination.pageNumber === 1} slot="first">
                <FaIcon icon={faAngleDoubleLeft} />
            </Button>
            <Button
                href="/posts?page={pagination.pageNumber - 1}"
                disabled={pagination.pageNumber === 1}
                slot="prev"
            >
                <FaIcon icon={faAngleLeft} />
            </Button>
            <Button
                class={pagination.pageNumber === pageNumber ? "btn-active" : ""}
                href="/posts?page={pageNumber}"
            >
                {pageNumber}
            </Button>
            <Button
                href="/posts?page={pagination.pageNumber + 1}"
                disabled={pagination.pageNumber === pagination.pageCount}
                slot="next"
            >
                <FaIcon icon={faAngleRight} />
            </Button>
            <Button
                href="/posts?page={pagination.pageCount}"
                disabled={pagination.pageNumber === pagination.pageCount}
                slot="last"
            >
                <FaIcon icon={faAngleDoubleRight} />
            </Button>
        </Pagination>
    {/if}
</div>
<Modal
    class="space-y-2"
    persistent={modals.postCreating.waiting}
    bind:visible={modals.postCreating.visible}
>
    <h1 class="text-2xl">Post creating</h1>
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
    <div class="grid grid-cols-2 gap-2 !mt-6">
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
    </div>
</Modal>
