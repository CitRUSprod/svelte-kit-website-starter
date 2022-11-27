<script lang="ts">
    import { Content, Button } from "$lib/components"
    import { ModalPostCreating } from "./_components"

    import { onDestroy } from "svelte"
    import { useQuery } from "@sveltestack/svelte-query"
    import { t, localePath } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import * as api from "$lib/api"

    import type { PageData } from "./$types"

    export let data: PageData

    let modalPostCreating: ModalPostCreating

    const queryGetPosts = useQuery("posts.getPosts", {
        initialData: data.itemsPage,
        async queryFn() {
            const res = await api.posts.getPosts()
            return res.data
        },
        onError(err: any) {
            if (err.response) {
                toasts.add("error", err.response.data.message)
            } else {
                toasts.add("error", "An error has occurred")
            }
        }
    })

    onDestroy(() => {
        $queryGetPosts.remove()
    })
</script>

<svelte:head>
    <title>{$t("routes.posts.posts")}</title>
</svelte:head>

<Content.Default title={$t("routes.posts.posts")}>
    <div>
        <Button type="success" on:click={modalPostCreating.open}>
            {$t("routes.posts.create-post")}
        </Button>
    </div>
    {#if $queryGetPosts.data}
        <div class="u:grid u:grid-cols-3 u:gap-4">
            {#each $queryGetPosts.data.items as post (post.id)}
                <a
                    class="u:p-4 u:border-primary u:rounded-lg u:border u:transition u:hover:bg-primary u:hover:bg-opacity-20 u:dark:hover:bg-opacity-20"
                    href={$localePath(`/posts/${post.id}`)}
                >
                    <div>
                        <h3>{post.title}</h3>
                    </div>
                    <div>
                        <p class="u:truncate">{post.content}</p>
                    </div>
                </a>
            {/each}
        </div>
    {/if}
</Content.Default>

<ModalPostCreating bind:this={modalPostCreating} />
