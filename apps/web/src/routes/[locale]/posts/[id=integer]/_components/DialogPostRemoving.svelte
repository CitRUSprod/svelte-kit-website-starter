<script lang="ts">
    import { Button, Dialog } from "$lib/components"

    import { goto } from "$app/navigation"
    import { t, localePath } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as api from "$lib/api"

    import type { Post } from "$lib/types"

    export let post: Post

    let dialog: Dialog

    export function open() {
        dialog.open()
    }

    export function close() {
        dialog.close()
    }

    const qcDeletePost = createQueryController({
        fn() {
            return api.posts.deletePost({ id: post.id })
        },
        async onSuccess() {
            toasts.add("success", $t("components.dialog-post-removing.post-removed-successfully"))
            close()
            await goto($localePath("/posts"))
        }
    })
</script>

<Dialog bind:this={dialog} class="u:flex u:flex-col u:gap-4 u:w-100">
    <div>
        <h1>{$t("components.dialog-post-removing.post-removing")}</h1>
    </div>
    <div>
        <p>{$t("components.dialog-post-removing.post-removing-question")}</p>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcDeletePost.loading} text variant="success" on:click={close}>
            {$t("components.dialog-post-removing.cancel")}
        </Button>
        <Button loading={$qcDeletePost.loading} variant="error" on:click={qcDeletePost.refresh}>
            {$t("components.dialog-post-removing.remove")}
        </Button>
    </div>
</Dialog>
