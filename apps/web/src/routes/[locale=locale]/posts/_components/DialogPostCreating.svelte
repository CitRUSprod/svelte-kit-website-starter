<script lang="ts">
    import { Button, TextField, TextArea, Dialog } from "$lib/components"

    import { goto } from "$app/navigation"
    import { ll, localePath } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    let dialog = $state<Dialog>()

    let title = $state("")
    let content = $state("")

    const vldResultTitle = $derived(vld.post.title(title))
    const vldResultContent = $derived(vld.post.content(content))

    const completedForm = $derived(vldResultTitle.valid && vldResultContent.valid)

    export function open() {
        title = ""
        content = ""

        dialog?.open()
    }

    export function close() {
        dialog?.close()
    }

    const qcCreatePost = createQueryController({
        fn() {
            return api.posts.createPost({
                title: vldResultTitle.value,
                content: vldResultContent.value
            })
        },
        async onSuccess(localPost) {
            toasts.add("success", $ll.postCreatedSuccessfully())
            close()
            await goto($localePath(`/posts/${localPost.id}`))
        }
    })
</script>

<Dialog
    bind:this={dialog}
    class="u:flex u:flex-col u:gap-4 u:w-200"
    persistent={$qcCreatePost.loading}
>
    <div>
        <h1 class="u:text-center">{$ll.postCreating()}</h1>
    </div>
    <div>
        <TextField
            disabled={$qcCreatePost.loading}
            label={$ll.title()}
            placeholder={$ll.enterTitle()}
            bind:value={title}
        />
    </div>
    <div>
        <TextArea
            class="u:resize-none"
            disabled={$qcCreatePost.loading}
            label={$ll.content()}
            placeholder={$ll.enterContent()}
            bind:value={content}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcCreatePost.loading} text variant="error" onclick={close}>
            {$ll.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$qcCreatePost.loading}
            variant="success"
            onclick={qcCreatePost.refresh}
        >
            {$ll.create()}
        </Button>
    </div>
</Dialog>
