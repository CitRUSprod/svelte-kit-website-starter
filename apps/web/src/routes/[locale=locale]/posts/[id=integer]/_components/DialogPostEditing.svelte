<script lang="ts">
    import * as schemasRoutes from "@repo/schemas/routes"

    import { ll } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Button, TextField, TextArea, Dialog } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"
    import * as vld from "$lib/validators"

    type Post = schemasRoutes.posts.$GetPostResponse

    interface Props {
        post: Post
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
        title = ""
        content = ""

        dialog?.close()
    }

    const qUpdatePost = useQuery({
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
    class="u:w-200"
    contentClass="u:flex u:flex-col u:gap-4"
    title={$ll.postEditing()}
    persistent={qUpdatePost.loading}
>
    <div>
        <TextField
            disabled={qUpdatePost.loading}
            label={$ll.title()}
            placeholder={$ll.enterTitle()}
            bind:value={title}
            data-testid="title-input"
        />
    </div>
    <div>
        <TextArea
            class="u:resize-none"
            disabled={qUpdatePost.loading}
            label={$ll.content()}
            placeholder={$ll.enterContent()}
            bind:value={content}
            data-testid="content-input"
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={qUpdatePost.loading} text variant="error" onClick={close}>
            {$ll.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={qUpdatePost.loading}
            variant="success"
            onClick={qUpdatePost.refetch}
            data-testid="edit-post-dialog-button"
        >
            {$ll.save()}
        </Button>
    </div>
</Dialog>
