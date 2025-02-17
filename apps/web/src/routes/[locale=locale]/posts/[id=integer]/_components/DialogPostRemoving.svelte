<script lang="ts">
    import * as schemasModels from "@local/schemas/models"

    import { goto } from "$app/navigation"
    import { ll, localePath } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Button, Dialog } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"

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

    const qDeletePost = useQuery({
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
    persistent={qDeletePost.loading}
>
    <div>
        <h1>{$ll.postRemoving()}</h1>
    </div>
    <div>
        <p>{$ll.postRemovingQuestion()}</p>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={qDeletePost.loading} text variant="success" click={close}>
            {$ll.cancel()}
        </Button>
        <Button
            loading={qDeletePost.loading}
            variant="error"
            onclick={qDeletePost.refetch}
            data-testid="remove-post-dialog-button"
        >
            {$ll.remove()}
        </Button>
    </div>
</Dialog>
