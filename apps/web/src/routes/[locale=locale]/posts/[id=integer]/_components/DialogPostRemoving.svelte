<script lang="ts">
    import { Button, Dialog } from "$lib/components"

    import * as schemasModels from "@local/schemas/models"
    import { goto } from "$app/navigation"
    import { ll, localePath } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as api from "$lib/api"

    interface Props {
        post: schemasModels.post.Post
    }

    const { post }: Props = $props()

    let dialog = $state<Dialog>()

    export function open() {
        dialog?.open()
    }

    export function close() {
        dialog?.close()
    }

    const qcDeletePost = createQueryController({
        fn() {
            return api.posts.deletePost({ id: post.id })
        },
        async onSuccess() {
            toasts.add("success", $ll.postRemovedSuccessfully())
            close()
            await goto($localePath("/posts"))
        }
    })
</script>

<Dialog
    bind:this={dialog}
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={$qcDeletePost.loading}
>
    <div>
        <h1>{$ll.postRemoving()}</h1>
    </div>
    <div>
        <p>{$ll.postRemovingQuestion()}</p>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcDeletePost.loading} text variant="success" click={close}>
            {$ll.cancel()}
        </Button>
        <Button loading={$qcDeletePost.loading} variant="error" onclick={qcDeletePost.refresh}>
            {$ll.remove()}
        </Button>
    </div>
</Dialog>
