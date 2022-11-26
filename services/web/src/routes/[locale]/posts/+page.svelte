<script lang="ts">
    import { Content, Button } from "$lib/components"
    import { ModalPostCreating } from "./_components"

    import { useQuery } from "@sveltestack/svelte-query"
    import * as api from "$lib/api"

    import { t, localePath } from "$lib/locales"
    import type { PageData } from "./$types"

    export let data: PageData

    let modalPostCreating: ModalPostCreating

    const queryGetPosts = useQuery("posts.getPosts", {
        queryFn() {
            return api.posts.getPosts()
        }
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
    <div class="u:grid u:grid-cols-3 u:gap-4">
        {#each data.itemsPage.items as post (post.id)}
            <a
                class="u:p-4 u:border-primary u:rounded-lg u:border u:transition u:hover:bg-primary u:hover:bg-opacity-20 u:dark:hover:bg-opacity-20"
                href={$localePath(`/posts/${String(post.id)}`)}
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
</Content.Default>

<ModalPostCreating bind:this={modalPostCreating} getPostsRefetch={() => $queryGetPosts.refetch()} />
