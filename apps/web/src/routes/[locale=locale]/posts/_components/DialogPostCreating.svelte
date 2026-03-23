<script lang="ts">
    import { goto } from "$app/navigation"
    import { ll, localePath } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Button, TextField, TextArea, Dialog } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"
    import * as vld from "$lib/validators"

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
        title = ""
        content = ""

        dialog?.close()
    }

    const qCreatePost = useQuery({
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
    class="u:w-200"
    contentClass="u:flex u:flex-col u:gap-4"
    title={$ll.postCreating()}
    persistent={qCreatePost.loading}
>
    <div>
        <TextField
            disabled={qCreatePost.loading}
            label={$ll.title()}
            placeholder={$ll.enterTitle()}
            bind:value={title}
            data-testid="title-input"
        />
    </div>
    <div>
        <TextArea
            class="u:resize-none"
            disabled={qCreatePost.loading}
            label={$ll.content()}
            placeholder={$ll.enterContent()}
            bind:value={content}
            data-testid="content-input"
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={qCreatePost.loading} text variant="error" onClick={close}>
            {$ll.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={qCreatePost.loading}
            variant="success"
            onClick={qCreatePost.refetch}
            data-testid="create-post-dialog-button"
        >
            {$ll.create()}
        </Button>
    </div>
</Dialog>
