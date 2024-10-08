<script lang="ts">
    import { Content, Button } from "$lib/components"
    import {
        DialogAvatarRemoving,
        DialogProfileEditing,
        DialogPasswordChanging,
        DialogEmailChanging,
        DialogUserRemoving
    } from "./_components"

    import { dt } from "@local/utils"
    import { ll, currentLocale } from "$i18n/helpers"
    import { toasts, userData } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as api from "$lib/api"

    export let data

    let avatarInput: HTMLInputElement
    let dialogAvatarRemoving: DialogAvatarRemoving
    let dialogProfileEditing: DialogProfileEditing
    let dialogPasswordChanging: DialogPasswordChanging
    let dialogEmailChanging: DialogEmailChanging
    let dialogUserRemoving: DialogUserRemoving

    const qcUploadAvatar = createQueryController({
        params: {
            img: null as File | null
        },
        fn(params) {
            if (params.img) {
                return api.profile.uploadAvatar({
                    img: params.img
                })
            } else {
                throw new Error("File is not selected")
            }
        },
        async onSuccess() {
            const res = await api.users.getUser({
                id: data.user.id
            })
            data.user = res.data
            toasts.add("success", $ll.avatarUpdatedSuccessfully())
        }
    })

    async function onSelectFile(e: { currentTarget: HTMLInputElement }) {
        if (e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0]
            qcUploadAvatar.params.img = file
            await qcUploadAvatar.refresh()
        }
    }
</script>

<svelte:head>
    <title>{$ll.profile()}</title>
</svelte:head>

<Content.Default title={$ll.profile()}>
    <div class="u:flex u:gap-4">
        <div class="u:w-50 u:h-50 u:overflow-hidden">
            <img
                class="u:w-full u:h-full u:object-cover"
                alt={$ll.avatar()}
                src={data.user.avatar ?? "/img/no-avatar.png"}
            />
        </div>
        <div>
            <ul>
                <li><b>{$ll.username()}:</b> {data.user.username}</li>
                {#if data.user.email}
                    <li><b>{$ll.email()}:</b> {data.user.email}</li>
                {/if}
                <li><b>{$ll.role()}:</b> {data.user.role.name}</li>
                <li>
                    <b>{$ll.banned()}:</b>
                    {#if data.user.ban}
                        {$ll.yes()}
                    {:else}
                        {$ll.no()}
                    {/if}
                </li>
                {#if data.user.ban}
                    <li><b>{$ll.banAuthor()}:</b> {data.user.ban.author.username}</li>
                    <li><b>{$ll.banReason()}:</b> {data.user.ban.reason}</li>
                    <li>
                        <b>{$ll.banDate()}:</b>
                        {dt.getFullDateAndTime(data.user.ban.date, data.tz, $currentLocale)}
                    </li>
                {/if}
                <li>
                    <b>{$ll.registrationDate()}:</b>
                    {dt.getFullDateAndTime(data.user.registrationDate, data.tz, $currentLocale)}
                </li>
            </ul>
        </div>
    </div>
    {#if $userData?.id === data.user.id}
        <div>
            <Button
                loading={$qcUploadAvatar.loading}
                variant="warning"
                on:click={() => avatarInput.click()}
            >
                {$ll.uploadAvatar()}
            </Button>
            <input bind:this={avatarInput} class="u:hidden" type="file" on:change={onSelectFile} />
            {#if data.user.avatar}
                <Button variant="error" on:click={dialogAvatarRemoving.open}>
                    {$ll.removeAvatar()}
                </Button>
            {/if}
            <Button variant="warning" on:click={dialogProfileEditing.open}>
                {$ll.edit()}
            </Button>
            <Button variant="warning" on:click={dialogPasswordChanging.open}>
                {$ll.changePassword()}
            </Button>
            {#if $userData.email}
                <Button variant="warning" on:click={dialogEmailChanging.open}>
                    {$ll.changeEmail()}
                </Button>
            {/if}
            <Button variant="error" on:click={dialogUserRemoving.open}>
                {$ll.removeUser()}
            </Button>
        </div>
    {/if}
</Content.Default>

<DialogAvatarRemoving bind:this={dialogAvatarRemoving} bind:user={data.user} />
<DialogProfileEditing bind:this={dialogProfileEditing} bind:user={data.user} />
<DialogPasswordChanging bind:this={dialogPasswordChanging} />
<DialogEmailChanging bind:this={dialogEmailChanging} user={data.user} />
<DialogUserRemoving bind:this={dialogUserRemoving} user={data.user} />
