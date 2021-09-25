<script lang="ts" context="module">
    import { browser } from "$app/env"
    import { goto } from "$app/navigation"
    import { axios, hasAccess } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"
    import type { Post } from "$lib/types"

    export const load: Load = async ({ page }) => {
        if (browser) {
            const { id } = page.params

            try {
                const { data } = await axios.get<Post>(`/api/posts/${id}`)
                return { props: { post: data } }
            } catch (err: unknown) {
                goto("/posts", { replaceState: true })
            }
        } else {
            return {}
        }
    }
</script>

<script lang="ts">
    import FaIcon from "svelte-fa"
    import { Button, Modal } from "$lib/components"

    import { DateTime } from "luxon"
    import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons"
    import { toasts, session } from "$lib/stores"
    import { Role } from "$lib/enums"

    export let post: Post | null = null

    const modals = {
        postEditing: {
            visible: false,
            waiting: false,
            title: "",
            body: "",
            open(this: void) {
                modals.postEditing.title = post!.title
                modals.postEditing.body = post!.body
                modals.postEditing.visible = true
            },
            close(this: void) {
                modals.postEditing.visible = false
            },
            async save(this: void) {
                modals.postEditing.waiting = true

                try {
                    const { id } = post!
                    const { data } = await axios.put<Post>(`/api/posts/${id}`, {
                        title: modals.postEditing.title,
                        body: modals.postEditing.body
                    })
                    post = data
                    toasts.add("success", "Post has been successfully edited")
                    modals.postEditing.visible = false
                } catch (err: any) {
                    toasts.add("error", err.response?.data?.message ?? err.message)
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
            async save(this: void) {
                modals.postRemoving.waiting = true

                try {
                    const { id } = post!
                    await axios.delete(`/api/posts/${id}`)
                    toasts.add("success", "Post has been successfully edited")
                    modals.postRemoving.visible = false
                    goto("/posts", { replaceState: true })
                } catch (err: any) {
                    toasts.add("error", err.response?.data?.message ?? err.message)
                }

                modals.postEditing.waiting = false
            }
        }
    }
</script>

<svelte:head>
    <title>Post</title>
</svelte:head>

{#if post}
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
                            {DateTime.fromISO(post.creationDate).toFormat("yyyy-MM-dd HH:mm")}
                        </div>
                        {#if post.creationDate !== post.editingDate}
                            <div>
                                <b>Edited at:</b>
                                {DateTime.fromISO(post.editingDate).toFormat("yyyy-MM-dd HH:mm")}
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
    <Modal
        class="space-y-2"
        persistent={modals.postEditing.waiting}
        bind:visible={modals.postEditing.visible}
    >
        <h1 class="text-2xl">Post editing</h1>
        <div class="form-control">
            <div class="label">
                <span class="label-text">Title:</span>
            </div>
            <input class="input input-bordered" bind:value={modals.postEditing.title} />
        </div>
        <div class="form-control">
            <div class="label">
                <span class="label-text">Body:</span>
            </div>
            <textarea
                class="textarea textarea-bordered h-64 resize-none"
                bind:value={modals.postEditing.body}
            />
        </div>
        <div class="grid grid-cols-2 gap-2 !mt-6">
            <Button
                class="btn-success btn-sm"
                loading={modals.postEditing.waiting}
                disabled={modals.postEditing.title === post.title &&
                    modals.postEditing.body === post.body}
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
        </div>
    </Modal>
    <Modal
        class="space-y-2"
        persistent={modals.postRemoving.waiting}
        bind:visible={modals.postRemoving.visible}
    >
        <h1 class="text-2xl">Post removing</h1>
        <div>Do you really want to remove this post?</div>
        <div class="grid grid-cols-2 gap-2 !mt-6">
            <Button
                class="btn-success btn-sm"
                loading={modals.postRemoving.waiting}
                on:click={modals.postRemoving.save}
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
        </div>
    </Modal>
{/if}
