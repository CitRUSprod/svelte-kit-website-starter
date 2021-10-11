<script lang="ts" context="module">
    import { fetchy, HttpError, vld, dt, hasAccess, createRedirectResponse } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"
    import type { Post } from "$lib/types"

    async function getPost(id: number, f?: typeof fetch) {
        const res = await fetchy.get(`/api/posts/${id}`, { fetch: f })
        const data: Post = await res.json()
        return data
    }

    export const load: Load = async ({ page: p, fetch: f }) => {
        try {
            const post = await getPost(parseInt(p.params.id), f)

            return {
                props: { post }
            }
        } catch {
            return createRedirectResponse("/posts")
        }
    }
</script>

<script lang="ts">
    import FaIcon from "svelte-fa"
    import { Button, CommonModal } from "$lib/components"

    import * as yup from "yup"
    import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons"
    import { goto } from "$app/navigation"
    import { Role } from "$lib/enums"
    import { toasts, session } from "$lib/stores"

    export let post: Post

    async function updatePost() {
        post = await getPost(post.id)
    }

    const modals = {
        postEditing: {
            visible: false,
            waiting: false,
            title: "",
            body: "",
            open(this: void) {
                modals.postEditing.title = post.title
                modals.postEditing.body = post.body
                modals.postEditing.visible = true
            },
            close(this: void) {
                modals.postEditing.visible = false
            },
            async save(this: void) {
                modals.postEditing.waiting = true

                try {
                    await fetchy.put(`/api/posts/${post.id}`, {
                        json: {
                            title: modals.postEditing.title.trim(),
                            body: modals.postEditing.body.trim()
                        }
                    })
                    await updatePost()
                    toasts.add("success", "Post has been successfully edited")
                    modals.postEditing.visible = false
                } catch (err: unknown) {
                    if (err instanceof HttpError) {
                        const data = await err.response.json()
                        toasts.add("error", data.message)
                    } else {
                        console.error(err)
                    }
                }

                modals.postEditing.waiting = false
            }
        },
        postRemoving: {
            visible: false,
            waiting: false,
            open(this: void) {
                modals.postRemoving.visible = true
            },
            close(this: void) {
                modals.postRemoving.visible = false
            },
            async remove(this: void) {
                modals.postRemoving.waiting = true

                try {
                    await fetchy.delete(`/api/posts/${post.id}`)
                    toasts.add("success", "Post has been successfully edited")
                    modals.postRemoving.visible = false
                    goto("/posts", { replaceState: true })
                } catch (err: unknown) {
                    if (err instanceof HttpError) {
                        const data = await err.response.json()
                        toasts.add("error", data.message)
                    } else {
                        console.error(err)
                    }
                }

                modals.postEditing.waiting = false
            }
        }
    }

    $: validators = {
        completedPostEditingModal:
            (!vld.isEqualT(modals.postEditing.title, post.title) ||
                !vld.isEqualT(modals.postEditing.body, post.body)) &&
            yup.string().trim().min(2).max(255).required().isValidSync(modals.postEditing.title) &&
            yup.string().trim().min(2).required().isValidSync(modals.postEditing.body)
    }
</script>

<svelte:head>
    <title>Post</title>
</svelte:head>

<h1 class="text-4xl">Post</h1>
<div class="mt-4 space-y-1">
    <div class="card bordered shadow-lg">
        <div class="card-body">
            <h2 class="card-title">{post.title}</h2>
            <p>{post.body}</p>
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
                    {#if post.editingDate}
                        <div>
                            <b>Edited at:</b>
                            {dt.getFullDateAndTime(post.editingDate)}
                        </div>
                    {/if}
                </div>
                {#if post.author.id === $session.user?.id || hasAccess($session.user, Role.Admin)}
                    <div>
                        <Button class="btn-warning" on:click={modals.postEditing.open}>
                            <FaIcon icon={faPencilAlt} />
                        </Button>
                        <Button class="btn-error" on:click={modals.postRemoving.open}>
                            <FaIcon icon={faTrash} />
                        </Button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>
<CommonModal
    title="Post editing"
    persistent={modals.postEditing.waiting}
    bind:visible={modals.postEditing.visible}
>
    <div class="form-control">
        <div class="label">
            <span class="label-text">Title:</span>
        </div>
        <input
            class="input input-bordered"
            disabled={modals.postEditing.waiting}
            bind:value={modals.postEditing.title}
        />
    </div>
    <div class="form-control">
        <div class="label">
            <span class="label-text">Body:</span>
        </div>
        <textarea
            class="textarea textarea-bordered h-64 resize-none"
            disabled={modals.postEditing.waiting}
            bind:value={modals.postEditing.body}
        />
    </div>
    <svelte:fragment slot="actions">
        <Button
            class="btn-success btn-sm"
            loading={modals.postEditing.waiting}
            disabled={!validators.completedPostEditingModal}
            on:click={modals.postEditing.save}
        >
            Save
        </Button>
        <Button
            class="btn-error btn-sm"
            disabled={modals.postEditing.waiting}
            on:click={modals.postEditing.close}
        >
            Cancel
        </Button>
    </svelte:fragment>
</CommonModal>
<CommonModal
    title="Post removing"
    persistent={modals.postRemoving.waiting}
    bind:visible={modals.postRemoving.visible}
>
    <div>Do you really want to remove this post?</div>
    <svelte:fragment slot="actions">
        <Button
            class="btn-success btn-sm"
            loading={modals.postRemoving.waiting}
            on:click={modals.postRemoving.remove}
        >
            Remove
        </Button>
        <Button
            class="btn-error btn-sm"
            disabled={modals.postRemoving.waiting}
            on:click={modals.postRemoving.close}
        >
            Cancel
        </Button>
    </svelte:fragment>
</CommonModal>
