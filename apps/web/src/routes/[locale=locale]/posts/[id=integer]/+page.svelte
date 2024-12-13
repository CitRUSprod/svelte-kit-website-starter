<script lang="ts">
    import { Content, Button } from "$lib/components"
    import { DialogPostEditing, DialogPostRemoving } from "./_components"

    import * as constantsEnums from "@local/constants/enums"
    import { dt } from "@local/utils"
    import { ll, localePath, currentLocale } from "$i18n/helpers"
    import { userData } from "$lib/stores"

    let { data = $bindable() } = $props()

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

<Content.Default title={localPost.title}>
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
            <Button variant="warning" onclick={dialogPostEditing?.open}>
                {$ll.edit()}
            </Button>
            <Button variant="error" onclick={dialogPostRemoving?.open}>
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
