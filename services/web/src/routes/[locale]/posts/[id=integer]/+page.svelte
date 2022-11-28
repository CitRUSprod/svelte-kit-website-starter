<script lang="ts">
    import { Content, Button } from "$lib/components"
    import { ModalPostEditing, ModalPostRemoving } from "./_components"

    import { t, localePath } from "$lib/locales"
    import { userData } from "$lib/stores"
    import { Permission } from "$lib/enums"
    import { dt } from "$lib/utils"

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
        <ul>
            <ul>
                <b>Author:</b>
                <a class="u:hover:underline" href={$localePath(`/users/${data.post.author.id}`)}>
                    {data.post.author.username}
                </a>
            </ul>
            <ul><b>Created:</b> {dt.getFullDateAndTime(data.post.creationDate)}</ul>
            {#if data.post.editingDate}
                <ul><b>Edited:</b> {dt.getFullDateAndTime(data.post.editingDate)}</ul>
            {/if}
        </ul>
    </div>
    {#if $userData?.id === data.post.author.id}
        <div>
            <Button type="warning" on:click={modalPostEditing.open}>
                {$t("routes.posts.[id].edit")}
            </Button>
            <Button type="error" on:click={modalPostRemoving.open}>
                {$t("routes.posts.[id].remove")}
            </Button>
        </div>
    {:else if $userData?.role.permissions.includes(Permission.DeleteOtherUserPost)}
        <div>
            <Button type="error" on:click={modalPostRemoving.open}>
                {$t("routes.posts.[id].remove")}
            </Button>
        </div>
    {/if}
</Content.Default>

<ModalPostEditing bind:this={modalPostEditing} bind:post={data.post} />
<ModalPostRemoving bind:this={modalPostRemoving} post={data.post} />
