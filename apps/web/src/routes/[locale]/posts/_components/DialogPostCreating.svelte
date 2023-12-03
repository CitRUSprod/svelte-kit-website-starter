<script lang="ts">
    import { Button, TextField, TextArea, Dialog } from "$lib/components"

    import { goto } from "$app/navigation"
    import { t, localePath } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    let dialog: Dialog

    let title = ""
    let content = ""

    $: vldResultTitle = vld.post.title(title)
    $: vldResultContent = vld.post.content(content)

    $: completedForm = vldResultTitle.valid && vldResultContent.valid

    export function open() {
        title = ""
        content = ""

        dialog.open()
    }

    export function close() {
        dialog.close()
    }

    const qcCreatePost = createQueryController({
        fn() {
            return api.posts.createPost({
                title: vldResultTitle.value,
                content: vldResultContent.value
            })
        },
        async onSuccess(localPost) {
            toasts.add("success", $t("components.dialog-post-creating.post-created-successfully"))
            close()
            await goto($localePath(`/posts/${localPost.id}`))
        }
    })
</script>

<Dialog bind:this={dialog} class="u:flex u:flex-col u:gap-4 u:w-200">
    <div>
        <h1 class="u:text-center">{$t("components.dialog-post-creating.post-creating")}</h1>
    </div>
    <div>
        <TextField
            disabled={$qcCreatePost.loading}
            label={$t("components.dialog-post-creating.title")}
            placeholder={$t("components.dialog-post-creating.enter-title")}
            bind:value={title}
        />
    </div>
    <div>
        <TextArea
            class="u:resize-none"
            disabled={$qcCreatePost.loading}
            label={$t("components.dialog-post-creating.content")}
            placeholder={$t("components.dialog-post-creating.enter-content")}
            bind:value={content}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcCreatePost.loading} text variant="error" on:click={close}>
            {$t("components.dialog-post-creating.cancel")}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$qcCreatePost.loading}
            variant="success"
            on:click={qcCreatePost.refresh}
        >
            {$t("components.dialog-post-creating.create")}
        </Button>
    </div>
</Dialog>
