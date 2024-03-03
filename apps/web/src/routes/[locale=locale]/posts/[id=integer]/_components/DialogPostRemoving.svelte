<script lang="ts">
    import { Button, Dialog } from "$lib/components"

    import * as schemasModels from "@local/schemas/models"
    import { goto } from "$app/navigation"
    import { ll, localePath } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as api from "$lib/api"

    export let post: schemasModels.post.Post

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
            toasts.add("success", $ll.$.$posts.$_id.$$dialogPostRemoving.postRemovedSuccessfully())
            close()
            await goto($localePath("/posts"))
        }
    })
</script>

<Dialog bind:this={dialog} class="u:flex u:flex-col u:gap-4 u:w-100">
    <div>
        <h1>{$ll.$.$posts.$_id.$$dialogPostRemoving.postRemoving()}</h1>
    </div>
    <div>
        <p>{$ll.$.$posts.$_id.$$dialogPostRemoving.postRemovingQuestion()}</p>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcDeletePost.loading} text variant="success" on:click={close}>
            {$ll.$.$posts.$_id.$$dialogPostRemoving.cancel()}
        </Button>
        <Button loading={$qcDeletePost.loading} variant="error" on:click={qcDeletePost.refresh}>
            {$ll.$.$posts.$_id.$$dialogPostRemoving.remove()}
        </Button>
    </div>
</Dialog>
