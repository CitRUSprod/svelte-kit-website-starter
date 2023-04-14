<script lang="ts">
    import { Button, Modal } from "$lib/components"

    import { onDestroy } from "svelte"
    import { useQuery } from "@sveltestack/svelte-query"
    import { goto } from "$app/navigation"
    import { t, localePath } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import * as api from "$lib/api"

    import type { Post } from "$lib/types"

    export let post: Post

    let visible = false

    export function open() {
        visible = true
    }

    export function close() {
        visible = false
    }

    const queryDeletePost = useQuery("posts.deletePost", {
        async queryFn() {
            const res = await api.posts.deletePost({ id: post.id })
            return res.data
        },
        async onSuccess() {
            toasts.add("success", $t("components.modal-post-removing.post-removed-successfully"))
            close()
            await goto($localePath("/posts"))
        },
        onError(err: any) {
            if (err.response) {
                toasts.add("error", err.response.data.message)
            } else {
                toasts.add("error", $t("global.error-occurred"))
            }
        }
    })

    onDestroy(() => {
        $queryDeletePost.remove()
    })
</script>

<Modal
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={$queryDeletePost.isFetching}
    bind:visible
>
    <div>
        <h1>{$t("components.modal-post-removing.post-removing")}</h1>
    </div>
    <div>
        <p>{$t("components.modal-post-removing.post-removing-question")}</p>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$queryDeletePost.isFetching} text type="success" on:click={close}>
            {$t("components.modal-post-removing.cancel")}
        </Button>
        <Button
            loading={$queryDeletePost.isFetching}
            type="error"
            on:click={() => $queryDeletePost.refetch()}
        >
            {$t("components.modal-post-removing.remove")}
        </Button>
    </div>
</Modal>
