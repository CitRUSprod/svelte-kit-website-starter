<script lang="ts">
    import { Button, TextField, TextArea, Modal } from "$lib/components"

    import { useQuery } from "@sveltestack/svelte-query"
    import { goto } from "$app/navigation"
    import { t, localePath } from "$lib/locales"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    export let getPostsRefetch: () => Promise<unknown>

    let visible = false

    let title = ""
    let content = ""

    $: vldResultTitle = vld.post.title(title)
    $: vldResultContent = vld.post.content(content)

    $: completedForm = vldResultTitle.valid && vldResultContent.valid

    export function open() {
        title = ""
        content = ""

        visible = true
    }

    export function close() {
        visible = false
    }

    const queryCreatePost = useQuery("posts.createPost", {
        queryFn() {
            return api.posts.createPost({
                title: vldResultTitle.value,
                content: vldResultContent.value
            })
        },
        async onSuccess({ data }) {
            await getPostsRefetch()
            close()
            await goto($localePath(`/posts/${data.id}`))
        }
    })
</script>

<Modal
    class="u:flex u:flex-col u:gap-4 u:w-200"
    persistent={$queryCreatePost.isLoading}
    bind:visible
>
    <div>
        <h1 class="u:text-center">{$t("components.modal-post-creating.post-creating")}</h1>
    </div>
    <div>
        <TextField
            disabled={$queryCreatePost.isLoading}
            label={$t("components.modal-post-creating.title")}
            placeholder={$t("components.modal-post-creating.enter-title")}
            bind:value={title}
        />
    </div>
    <div>
        <TextArea
            class="u:resize-none"
            disabled={$queryCreatePost.isLoading}
            label={$t("components.modal-post-creating.content")}
            placeholder={$t("components.modal-post-creating.enter-content")}
            bind:value={content}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$queryCreatePost.isLoading} text type="error" on:click={close}>
            {$t("components.modal-post-creating.cancel")}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$queryCreatePost.isLoading}
            type="success"
            on:click={() => $queryCreatePost.refetch()}
        >
            {$t("components.modal-post-creating.create")}
        </Button>
    </div>
</Modal>
