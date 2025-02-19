<script lang="ts">
    import * as constantsEnums from "@repo/constants/enums"
    import { dt } from "@repo/utils"

    import { DialogPostEditing, DialogPostRemoving } from "./_components"

    import { ll, localePath, currentLocale } from "$i18n/helpers"
    import { Content, Button } from "$lib/components"
    import { userData } from "$lib/stores"

    const { data } = $props()

    let dialogPostEditing = $state<DialogPostEditing>()
    let dialogPostRemoving = $state<DialogPostRemoving>()

    let localPost = $state(data.post)

    $effect(() => {
        localPost = data.post
    })
</script>

<svelte:head>
    <title>{localPost.title}</title>
</svelte:head>

<Content.Default title={localPost.title} titleTestId="content-title" bodyTestId="content-body">
    <div class="u:flex u:flex-col u:gap-4">
        {#each localPost.content.split(/\n+/) as paragraph (paragraph)}
            <p>{paragraph}</p>
        {/each}
    </div>
    <div>
        <ul>
            <ul>
                <b>{$ll.author()}:</b>
                {#if localPost.author}
                    <a
                        class="u:hover:underline"
                        href={$localePath(`/users/${String(localPost.author.id)}`)}
                    >
                        {localPost.author.username}
                    </a>
                {:else}
                    <span>[{$ll.deleted().toUpperCase()}]</span>
                {/if}
            </ul>
            <ul>
                <b>{$ll.created()}:</b>
                {dt.getFullDateAndTime(localPost.creationDate, data.tz, $currentLocale)}
            </ul>
            {#if localPost.editingDate}
                <ul>
                    <b>{$ll.edited()}:</b>
                    {dt.getFullDateAndTime(localPost.editingDate, data.tz, $currentLocale)}
                </ul>
            {/if}
        </ul>
    </div>
    {#if localPost.author && $userData?.id === localPost.author.id}
        <div>
            <Button
                variant="warning"
                onclick={dialogPostEditing?.open}
                data-testid="edit-post-button"
            >
                {$ll.edit()}
            </Button>
            <Button
                variant="error"
                onclick={dialogPostRemoving?.open}
                data-testid="remove-post-button"
            >
                {$ll.remove()}
            </Button>
        </div>
    {:else if $userData?.role.permissions.includes(constantsEnums.Permission.DeleteOtherUserPost)}
        <div>
            <Button variant="error" onclick={dialogPostRemoving?.open}>
                {$ll.remove()}
            </Button>
        </div>
    {/if}
</Content.Default>

<DialogPostEditing bind:this={dialogPostEditing} bind:post={localPost} />
<DialogPostRemoving bind:this={dialogPostRemoving} post={localPost} />
