<script lang="ts">
    import { Button, TextField, TextArea, Dialog } from "$lib/components"

    import { goto } from "$app/navigation"
    import { ll, localePath } from "$i18n/helpers"
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
            toasts.add("success", $ll.$.$posts.$$dialogPostCreating.postCreatedSuccessfully())
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
        <h1 class="u:text-center">{$ll.$.$posts.$$dialogPostCreating.postCreating()}</h1>
    </div>
    <div>
        <TextField
            disabled={$qcCreatePost.loading}
            label={$ll.$.$posts.$$dialogPostCreating.title()}
            placeholder={$ll.$.$posts.$$dialogPostCreating.enterTitle()}
            bind:value={title}
        />
    </div>
    <div>
        <TextArea
            class="u:resize-none"
            disabled={$qcCreatePost.loading}
            label={$ll.$.$posts.$$dialogPostCreating.content()}
            placeholder={$ll.$.$posts.$$dialogPostCreating.enterContent()}
            bind:value={content}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcCreatePost.loading} text variant="error" on:click={close}>
            {$ll.$.$posts.$$dialogPostCreating.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$qcCreatePost.loading}
            variant="success"
            on:click={qcCreatePost.refresh}
        >
            {$ll.$.$posts.$$dialogPostCreating.create()}
        </Button>
    </div>
</Dialog>
