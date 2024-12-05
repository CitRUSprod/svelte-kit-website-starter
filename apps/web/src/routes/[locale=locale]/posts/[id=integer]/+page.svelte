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
</script>

<svelte:head>
    <title>{data.post.title}</title>
</svelte:head>

<Content.Default title={data.post.title}>
    <div class="u:flex u:flex-col u:gap-4">
        {#each data.post.content.split(/\n+/) as paragraph (paragraph)}
            <p>{paragraph}</p>
        {/each}
    </div>
    <div>
        <ul>
            <ul>
                <b>{$ll.author()}:</b>
                {#if data.post.author}
                    <a
                        class="u:hover:underline"
                        href={$localePath(`/users/${String(data.post.author.id)}`)}
                    >
                        {data.post.author.username}
                    </a>
                {:else}
                    <span>[{$ll.deleted().toUpperCase()}]</span>
                {/if}
            </ul>
            <ul>
                <b>{$ll.created()}:</b>
                {dt.getFullDateAndTime(data.post.creationDate, data.tz, $currentLocale)}
            </ul>
            {#if data.post.editingDate}
                <ul>
                    <b>{$ll.edited()}:</b>
                    {dt.getFullDateAndTime(data.post.editingDate, data.tz, $currentLocale)}
                </ul>
            {/if}
        </ul>
    </div>
    {#if data.post.author && $userData?.id === data.post.author.id}
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

<DialogPostEditing bind:this={dialogPostEditing} bind:post={data.post} />
<DialogPostRemoving bind:this={dialogPostRemoving} post={data.post} />
