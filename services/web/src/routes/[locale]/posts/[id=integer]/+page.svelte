<script lang="ts">
    import { Content, Button } from "$lib/components"
    import { ModalPostEditing, ModalPostRemoving } from "./_components"

    import { browser } from "$app/environment"
    import { goto } from "$app/navigation"
    import { t, localePath } from "$lib/locales"
    import { posts } from "$lib/stores"

    import type { PageData } from "./$types"

    export let data: PageData

    $: post = $posts.find(p => p.id === data.id)
    $: if (browser && !post) goto($localePath("/posts"))

    let modalPostEditing: ModalPostEditing
    let modalPostRemoving: ModalPostRemoving
</script>

<svelte:head>
    {#if browser && post}
        {#key post}
            <title>{post.title}</title>
        {/key}
    {/if}
</svelte:head>

{#if browser && post}
    <Content.Default title={post.title}>
        <div class="u:flex u:flex-col u:gap-4">
            {#each post.content.split(/\n+/) as paragraph}
                <p>{paragraph}</p>
            {/each}
        </div>
        <div>
            <Button type="warning" on:click={modalPostEditing.open}>
                {$t("routes.posts.[id].edit")}
            </Button>
            <Button type="error" on:click={modalPostRemoving.open}>
                {$t("routes.posts.[id].remove")}
            </Button>
        </div>
    </Content.Default>

    <ModalPostEditing bind:this={modalPostEditing} {post} />
    <ModalPostRemoving bind:this={modalPostRemoving} {post} />
{/if}
