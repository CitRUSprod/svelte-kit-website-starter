<script lang="ts">
    import { Button, TextField, TextArea, Dialog } from "$lib/components"

    import { t } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    import type { Post } from "$lib/types"

    export let post: Post

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
            toasts.add("success", $t("components.dialog-post-editing.post-edited-successfully"))
            close()
        }
    })
</script>

<Dialog bind:this={dialog} class="u:flex u:flex-col u:gap-4 u:w-200">
    <div>
        <h1 class="u:text-center">{$t("components.dialog-post-editing.post-editing")}</h1>
    </div>
    <div>
        <TextField
            disabled={$qcUpdatePost.loading}
            label={$t("components.dialog-post-editing.title")}
            placeholder={$t("components.dialog-post-editing.enter-title")}
            bind:value={title}
        />
    </div>
    <div>
        <TextArea
            class="u:resize-none"
            disabled={$qcUpdatePost.loading}
            label={$t("components.dialog-post-editing.content")}
            placeholder={$t("components.dialog-post-editing.enter-content")}
            bind:value={content}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcUpdatePost.loading} text variant="error" on:click={close}>
            {$t("components.dialog-post-editing.cancel")}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$qcUpdatePost.loading}
            variant="success"
            on:click={qcUpdatePost.refresh}
        >
            {$t("components.dialog-post-editing.save")}
        </Button>
    </div>
</Dialog>
