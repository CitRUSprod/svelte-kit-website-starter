<script lang="ts">
    import { Button, TextField, TextArea, Dialog } from "$lib/components"

    import * as schemasModels from "@local/schemas/models"
    import { ll } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    export let post: schemasModels.post.Post

    let dialog: Dialog

    let title = ""
    let content = ""

    $: vldResultTitle = vld.post.title(title)
    $: vldResultContent = vld.post.content(content)

    $: completedForm =
        vldResultTitle.valid &&
        vldResultContent.valid &&
        (vldResultTitle.value !== post.title || vldResultContent.value !== post.content)

    export function open() {
        title = post.title
        content = post.content

        dialog.open()
    }

    export function close() {
        dialog.close()
    }

    const qcUpdatePost = createQueryController({
        fn() {
            return api.posts.updatePost({
                id: post.id,
                title: vldResultTitle.value,
                content: vldResultContent.value
            })
        },
        onSuccess(localPost) {
            post = localPost
            toasts.add("success", $ll.$.$posts.$_id.$$dialogPostEditing.postEditedSuccessfully())
            close()
        }
    })
</script>

<Dialog
    bind:this={dialog}
    class="u:flex u:flex-col u:gap-4 u:w-200"
    persistent={$qcUpdatePost.loading}
>
    <div>
        <h1 class="u:text-center">{$ll.$.$posts.$_id.$$dialogPostEditing.postEditing()}</h1>
    </div>
    <div>
        <TextField
            disabled={$qcUpdatePost.loading}
            label={$ll.$.$posts.$_id.$$dialogPostEditing.title()}
            placeholder={$ll.$.$posts.$_id.$$dialogPostEditing.enterTitle()}
            bind:value={title}
        />
    </div>
    <div>
        <TextArea
            class="u:resize-none"
            disabled={$qcUpdatePost.loading}
            label={$ll.$.$posts.$_id.$$dialogPostEditing.content()}
            placeholder={$ll.$.$posts.$_id.$$dialogPostEditing.enterContent()}
            bind:value={content}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcUpdatePost.loading} text variant="error" on:click={close}>
            {$ll.$.$posts.$_id.$$dialogPostEditing.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$qcUpdatePost.loading}
            variant="success"
            on:click={qcUpdatePost.refresh}
        >
            {$ll.$.$posts.$_id.$$dialogPostEditing.save()}
        </Button>
    </div>
</Dialog>
