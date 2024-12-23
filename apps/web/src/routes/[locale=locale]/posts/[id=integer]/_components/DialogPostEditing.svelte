<script lang="ts">
    import { Button, TextField, TextArea, Dialog } from "$lib/components"

    import * as schemasModels from "@local/schemas/models"
    import { ll } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    interface Props {
        post: schemasModels.post.Post
    }

    let { post = $bindable() }: Props = $props()

    let dialog = $state<Dialog>()

    let title = $state("")
    let content = $state("")

    const vldResultTitle = $derived(vld.post.title(title))
    const vldResultContent = $derived(vld.post.content(content))

    const completedForm = $derived(
        vldResultTitle.valid &&
            vldResultContent.valid &&
            (vldResultTitle.value !== post.title || vldResultContent.value !== post.content)
    )

    export function open() {
        title = post.title
        content = post.content

        dialog?.open()
    }

    export function close() {
        dialog?.close()
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
            toasts.add("success", $ll.postEditedSuccessfully())
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
        <h1 class="u:text-center">{$ll.postEditing()}</h1>
    </div>
    <div>
        <TextField
            disabled={$qcUpdatePost.loading}
            label={$ll.title()}
            placeholder={$ll.enterTitle()}
            bind:value={title}
            data-testid="title-input"
        />
    </div>
    <div>
        <TextArea
            class="u:resize-none"
            disabled={$qcUpdatePost.loading}
            label={$ll.content()}
            placeholder={$ll.enterContent()}
            bind:value={content}
            data-testid="content-input"
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcUpdatePost.loading} text variant="error" onclick={close}>
            {$ll.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$qcUpdatePost.loading}
            variant="success"
            onclick={qcUpdatePost.refresh}
            data-testid="edit-post-dialog-button"
        >
            {$ll.save()}
        </Button>
    </div>
</Dialog>
