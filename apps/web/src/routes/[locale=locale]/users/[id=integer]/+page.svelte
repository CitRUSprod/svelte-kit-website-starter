<script lang="ts">
    import { Content, Button } from "$lib/components"
    import {
        DialogAvatarRemoving,
        DialogProfileEditing,
        DialogPasswordChanging,
        DialogEmailChanging
    } from "./_components"

    import { ll, currentLocale } from "$i18n/helpers"
    import { toasts, userData } from "$lib/stores"
    import { createQueryController, dt } from "$lib/utils"
    import * as api from "$lib/api"

    export let data

    let avatarInput: HTMLInputElement
    let dialogAvatarRemoving: DialogAvatarRemoving
    let dialogProfileEditing: DialogProfileEditing
    let dialogPasswordChanging: DialogPasswordChanging
    let dialogEmailChanging: DialogEmailChanging

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
            toasts.add("success", $ll.$.$users.$_id.avatarUpdatedSuccessfully())
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
    <title>{$ll.$.$users.$_id.profile()}</title>
</svelte:head>

<Content.Default title={$ll.$.$users.$_id.profile()}>
    <div class="u:flex u:gap-4">
        <div class="u:w-50 u:h-50 u:overflow-hidden">
            <img
                class="u:w-full u:h-full u:object-cover"
                alt={$ll.$.$users.$_id.avatar()}
                src={data.user.avatar ?? "/img/no-avatar.png"}
            />
        </div>
        <div>
            <ul>
                <li><b>{$ll.$.$users.$_id.username()}:</b> {data.user.username}</li>
                {#if data.user.email}
                    <li><b>{$ll.$.$users.$_id.email()}:</b> {data.user.email}</li>
                {/if}
                <li><b>{$ll.$.$users.$_id.role()}:</b> {data.user.role.name}</li>
                <li>
                    <b>{$ll.$.$users.$_id.banned()}:</b>
                    {#if data.user.banned}
                        {$ll.$.$users.$_id.yes()}
                    {:else}
                        {$ll.$.$users.$_id.no()}
                    {/if}
                </li>
                <li>
                    <b>{$ll.$.$users.$_id.registrationDate()}:</b>
                    {dt.getFullDateAndTime(data.user.registrationDate, $currentLocale)}
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
                {$ll.$.$users.$_id.uploadAvatar()}
            </Button>
            <input bind:this={avatarInput} class="u:hidden" type="file" on:change={onSelectFile} />
            {#if data.user.avatar}
                <Button variant="error" on:click={dialogAvatarRemoving.open}>
                    {$ll.$.$users.$_id.removeAvatar()}
                </Button>
            {/if}
            <Button variant="warning" on:click={dialogProfileEditing.open}>
                {$ll.$.$users.$_id.edit()}
            </Button>
            <Button variant="warning" on:click={dialogPasswordChanging.open}>
                {$ll.$.$users.$_id.changePassword()}
            </Button>
            {#if $userData.email}
                <Button variant="warning" on:click={dialogEmailChanging.open}>
                    {$ll.$.$users.$_id.changeEmail()}
                </Button>
            {/if}
        </div>
    {/if}
</Content.Default>

<DialogAvatarRemoving bind:this={dialogAvatarRemoving} bind:user={data.user} />
<DialogProfileEditing bind:this={dialogProfileEditing} bind:user={data.user} />
<DialogPasswordChanging bind:this={dialogPasswordChanging} />
<DialogEmailChanging bind:this={dialogEmailChanging} user={data.user} />
