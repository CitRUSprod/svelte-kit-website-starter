<script lang="ts">
    import { Content, Button } from "$lib/components"
    import { ModalPostEditing, ModalPostRemoving } from "./_components"

    import { t } from "$lib/locales"

    import type { PageData } from "./$types"

    export let data: PageData

    let modalPostEditing: ModalPostEditing
    let modalPostRemoving: ModalPostRemoving
</script>

<svelte:head>
    <title>{data.post.title}</title>
</svelte:head>

<Content.Default title={data.post.title}>
    <div class="u:flex u:flex-col u:gap-4">
        {#each data.post.content.split(/\n+/) as paragraph}
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

<ModalPostEditing bind:this={modalPostEditing} post={data.post} />
<ModalPostRemoving bind:this={modalPostRemoving} post={data.post} />
