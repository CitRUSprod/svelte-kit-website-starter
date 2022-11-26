<script lang="ts">
    import { Button, TextField, TextArea, Modal } from "$lib/components"

    import { useQuery } from "@sveltestack/svelte-query"
    import { t } from "$lib/locales"
    import { vld } from "$lib/utils"
    import * as api from "$lib/api"

    import type { Post } from "$lib/types"

    export let post: Post

    let visible = false

    let title = ""
    let content = ""

    $: vldResultTitle = vld.title(title)
    $: vldResultContent = vld.content(content)

    $: completedForm =
        vldResultTitle.valid &&
        vldResultContent.valid &&
        (vldResultTitle.value !== post.title || vldResultContent.value !== post.content)

    export function open() {
        title = post.title
        content = post.content

        visible = true
    }

    export function close() {
        visible = false
    }

    const queryUpdatePost = useQuery("posts.updatePost", {
        queryFn() {
            return api.posts.updatePost({
                id: post.id,
                title: vldResultTitle.value,
                content: vldResultContent.value
            })
        },
        async onSuccess() {
            close()
        }
    })
</script>

<Modal
    class="u:flex u:flex-col u:gap-4 u:w-200"
    persistent={$queryUpdatePost.isLoading}
    bind:visible
>
    <div>
        <h1 class="u:text-center">{$t("components.modal-post-editing.post-editing")}</h1>
    </div>
    <div>
        <TextField
            disabled={$queryUpdatePost.isLoading}
            label={$t("components.modal-post-editing.title")}
            placeholder={$t("components.modal-post-editing.enter-title")}
            bind:value={title}
        />
    </div>
    <div>
        <TextArea
            class="u:resize-none"
            disabled={$queryUpdatePost.isLoading}
            label={$t("components.modal-post-editing.content")}
            placeholder={$t("components.modal-post-editing.enter-content")}
            bind:value={content}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$queryUpdatePost.isLoading} text type="error" on:click={close}>
            {$t("components.modal-post-editing.cancel")}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$queryUpdatePost.isLoading}
            type="success"
            on:click={() => $queryUpdatePost.refetch()}
        >
            {$t("components.modal-post-editing.save")}
        </Button>
    </div>
</Modal>
