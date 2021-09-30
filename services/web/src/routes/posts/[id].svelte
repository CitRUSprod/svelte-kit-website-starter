<script lang="ts" context="module">
    import { browser } from "$app/env"
    import { goto } from "$app/navigation"
    import { axios, vld, hasAccess } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"
    import type { Post } from "$lib/types"

    async function getPost(id: number) {
        const { data } = await axios.get<Post>(`/api/posts/${id}`)
        return data
    }

    export const load: Load = async ({ page }) => {
        if (browser) {
            try {
                const post = await getPost(parseInt(page.params.id))

                return {
                    props: {
                        asyncData: { post }
                    }
                }
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
    import { Button, CommonModal } from "$lib/components"

    import * as yup from "yup"
    import { DateTime } from "luxon"
    import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons"
    import { toasts, session } from "$lib/stores"
    import { Role } from "$lib/enums"

    interface AsyncData {
        post: Post
    }

    export let asyncData: AsyncData | null = null

    async function updatePost() {
        asyncData!.post = await getPost(asyncData!.post.id)
    }

    const modals = {
        postEditing: {
            visible: false,
            waiting: false,
            title: "",
            body: "",
            open(this: void) {
                modals.postEditing.title = asyncData!.post.title
                modals.postEditing.body = asyncData!.post.body
                modals.postEditing.visible = true
            },
            close(this: void) {
                modals.postEditing.visible = false
            },
            async save(this: void) {
                modals.postEditing.waiting = true

                try {
                    await axios.put<Post>(`/api/posts/${asyncData!.post.id}`, {
                        title: modals.postEditing.title.trim(),
                        body: modals.postEditing.body.trim()
                    })
                    await updatePost()
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
            async remove(this: void) {
                modals.postRemoving.waiting = true

                try {
                    await axios.delete(`/api/posts/${asyncData!.post.id}`)
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

    $: validators = {
        completedPostEditingModal:
            !!asyncData &&
            (!vld.isEqualT(modals.postEditing.title, asyncData.post.title) ||
                !vld.isEqualT(modals.postEditing.body, asyncData.post.body)) &&
            yup.string().trim().min(2).max(255).required().isValidSync(modals.postEditing.title) &&
            yup.string().trim().min(2).required().isValidSync(modals.postEditing.body)
    }
</script>

<svelte:head>
    <title>Post</title>
</svelte:head>

{#if asyncData}
    <h1 class="text-4xl">Post</h1>
    <div class="mt-4 space-y-1">
        <div class="card bordered shadow-lg">
            <div class="card-body">
                <h2 class="card-title">{asyncData.post.title}</h2>
                <p>{asyncData.post.body}</p>
                <div class="card-actions justify-between items-center">
                    <div class="text-sm">
                        <div>
                            <b>Author:</b>
                            <a class="hover:underline" href="/users/{asyncData.post.author.id}">
                                {asyncData.post.author.username}
                            </a>
                        </div>
                        <div>
                            <b>Created at:</b>
                            {DateTime.fromISO(asyncData.post.creationDate).toFormat(
                                "yyyy-MM-dd HH:mm"
                            )}
                        </div>
                        {#if asyncData.post.editingDate}
                            <div>
                                <b>Edited at:</b>
                                {DateTime.fromISO(asyncData.post.editingDate).toFormat(
                                    "yyyy-MM-dd HH:mm"
                                )}
                            </div>
                        {/if}
                    </div>
                    {#if asyncData.post.author.id === $session.user?.id || hasAccess($session.user, Role.Admin)}
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
{/if}
