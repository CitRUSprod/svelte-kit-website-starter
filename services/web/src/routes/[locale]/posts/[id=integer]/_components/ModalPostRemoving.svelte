<script lang="ts">
    import { Button, Modal } from "$lib/components"

    import { goto } from "$app/navigation"
    import { t, localePath } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
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

    const qcDeletePost = createQueryController({
        fn() {
            return api.posts.deletePost({ id: post.id })
        },
        async onSuccess() {
            toasts.add("success", $t("components.modal-post-removing.post-removed-successfully"))
            close()
            await goto($localePath("/posts"))
        }
    })
</script>

<Modal class="u:flex u:flex-col u:gap-4 u:w-100" persistent={$qcDeletePost.loading} bind:visible>
    <div>
        <h1>{$t("components.modal-post-removing.post-removing")}</h1>
    </div>
    <div>
        <p>{$t("components.modal-post-removing.post-removing-question")}</p>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcDeletePost.loading} text type="success" on:click={close}>
            {$t("components.modal-post-removing.cancel")}
        </Button>
        <Button loading={$qcDeletePost.loading} type="error" on:click={qcDeletePost.refresh}>
            {$t("components.modal-post-removing.remove")}
        </Button>
    </div>
</Modal>
