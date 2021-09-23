<script lang="ts" context="module">
    import { browser } from "$app/env"
    import { axios } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"
    import type { Session, Post } from "$lib/types"

    export const load: Load<{ session: Session }> = async ({ session }) => {
        if (!session.user) {
            return {
                status: 302,
                redirect: "/"
            }
        }

        if (browser) {
            const { data } = await axios.get<Array<Post>>("/api/posts")
            return { props: { posts: data } }
        } else {
            return {}
        }
    }
</script>

<script lang="ts">
    import { Button, Modal } from "$lib/components"

    import { DateTime } from "luxon"
    import { toasts } from "$lib/stores"

    export let posts: Array<Post> = []

    function toShortStr(str: string) {
        const s = str.substr(0, 100).trimEnd()
        return s.length < str.length ? `${s}...` : str
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
<div class="flex justify-end mt-4">
    <Button class="btn-success" on:click={modals.postCreating.open}>New post</Button>
</div>
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
                            {DateTime.fromISO(post.createdAt).toFormat("yyyy-MM-dd HH:mm")}
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
