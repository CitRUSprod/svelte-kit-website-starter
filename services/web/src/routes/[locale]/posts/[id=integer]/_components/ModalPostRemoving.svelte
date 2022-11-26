<script lang="ts">
    import { Button, Modal } from "$lib/components"

    import { useQuery } from "@sveltestack/svelte-query"
    import { t } from "$lib/locales"
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
        queryFn() {
            return api.posts.deletePost({ id: post.id })
        },
        async onSuccess() {
            close()
        }
    })
</script>

<Modal
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={$queryDeletePost.isLoading}
    bind:visible
>
    <div>
        <h1>{$t("components.modal-post-removing.post-removing")}</h1>
    </div>
    <div>
        <p>{$t("components.modal-post-removing.post-removing-question")}</p>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$queryDeletePost.isLoading} text type="success" on:click={close}>
            {$t("components.modal-post-removing.cancel")}
        </Button>
        <Button
            loading={$queryDeletePost.isLoading}
            type="error"
            on:click={() => $queryDeletePost.refetch()}
        >
            {$t("components.modal-post-removing.remove")}
        </Button>
    </div>
</Modal>
