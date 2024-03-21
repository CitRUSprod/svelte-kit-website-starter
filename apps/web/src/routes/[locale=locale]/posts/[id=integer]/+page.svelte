<script lang="ts">
    import { Content, Button } from "$lib/components"
    import { DialogPostEditing, DialogPostRemoving } from "./_components"

    import * as constantsEnums from "@local/constants/enums"
    import { dt } from "@local/utils"
    import { ll, localePath, currentLocale } from "$i18n/helpers"
    import { userData } from "$lib/stores"

    export let data

    let dialogPostEditing: DialogPostEditing
    let dialogPostRemoving: DialogPostRemoving
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
                <b>{$ll.$.$posts.$_id.author()}:</b>
                <a
                    class="u:hover:underline"
                    href={$localePath(`/users/${String(data.post.author.id)}`)}
                >
                    {data.post.author.username}
                </a>
            </ul>
            <ul>
                <b>{$ll.$.$posts.$_id.created()}:</b>
                {dt.getFullDateAndTime(data.post.creationDate, data.tz, $currentLocale)}
            </ul>
            {#if data.post.editingDate}
                <ul>
                    <b>{$ll.$.$posts.$_id.edited()}:</b>
                    {dt.getFullDateAndTime(data.post.editingDate, data.tz, $currentLocale)}
                </ul>
            {/if}
        </ul>
    </div>
    {#if $userData?.id === data.post.author.id}
        <div>
            <Button variant="warning" on:click={dialogPostEditing.open}>
                {$ll.$.$posts.$_id.edit()}
            </Button>
            <Button variant="error" on:click={dialogPostRemoving.open}>
                {$ll.$.$posts.$_id.remove()}
            </Button>
        </div>
    {:else if $userData?.role.permissions.includes(constantsEnums.Permission.DeleteOtherUserPost)}
        <div>
            <Button variant="error" on:click={dialogPostRemoving.open}>
                {$ll.$.$posts.$_id.remove()}
            </Button>
        </div>
    {/if}
</Content.Default>

<DialogPostEditing bind:this={dialogPostEditing} bind:post={data.post} />
<DialogPostRemoving bind:this={dialogPostRemoving} post={data.post} />
