<script lang="ts">
    import { Content, Button, OAuthProviderButton } from "$lib/components"
    import {
        DialogAvatarRemoving,
        DialogProfileEditing,
        DialogPasswordChanging,
        DialogEmailChanging,
        DialogEmailLinking,
        DialogUserRemoving
    } from "./_components"

    // eslint-disable-next-line @typescript-eslint/naming-convention
    import * as _ from "lodash-es"
    import * as constantsEnums from "@local/constants/enums"
    import { dt } from "@local/utils"
    import { ll, currentLocale } from "$i18n/helpers"
    import { toasts, userData } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as api from "$lib/api"

    const { data = $bindable() } = $props()

    let avatarInput = $state<HTMLInputElement>()
    let dialogAvatarRemoving = $state<DialogAvatarRemoving>()
    let dialogProfileEditing = $state<DialogProfileEditing>()
    let dialogPasswordChanging = $state<DialogPasswordChanging>()
    let dialogEmailChanging = $state<DialogEmailChanging>()
    let dialogEmailLinking = $state<DialogEmailLinking>()
    let dialogUserRemoving = $state<DialogUserRemoving>()

    let localUser = $state(data.user)

    $effect(() => {
        localUser = data.user
    })

    const hasMoreThanOneLinkedAccount = $derived(
        Object.values($userData?.linkedAccounts ?? {}).filter(value => value).length > 1
    )

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
            $userData = res.data
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

    const qcEmailUnlink = createQueryController({
        fn() {
            return api.auth.unlink()
        },
        async onSuccess() {
            toasts.add("success", $ll.confirmationEmailSent())
        }
    })

    const qcTwitchUnlink = createQueryController({
        fn() {
            return api.auth.oAuthUnlink({
                provider: _.kebabCase(constantsEnums.OAuthProvider.Twitch)
            })
        },
        async onSuccess(user) {
            $userData = user
            toasts.add(
                "success",
                $ll.accountUnlinkedSuccessfully({ provider: constantsEnums.OAuthProvider.Twitch })
            )
        }
    })
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
                src={localUser.avatar ?? "/img/no-avatar.png"}
            />
        </div>
        <div>
            <ul>
                <li><b>{$ll.username()}:</b> {localUser.username}</li>
                {#if localUser.email}
                    <li><b>{$ll.email()}:</b> {localUser.email}</li>
                {/if}
                {#if $userData?.id === localUser.id && $userData.linkedAccounts}
                    <li>
                        <b>Twitch:</b>
                        {#if $userData.linkedAccounts.twitch}
                            {$ll.linked()}
                            {#if hasMoreThanOneLinkedAccount}
                                <Button
                                    loading={$qcTwitchUnlink.loading}
                                    variant="error"
                                    onclick={qcTwitchUnlink.refresh}
                                >
                                    {$ll.unlink()}
                                </Button>
                            {/if}
                        {:else}
                            {$ll.unlinked()}
                        {/if}
                    </li>
                {/if}
                <li><b>{$ll.role()}:</b> {localUser.role.name}</li>
                <li>
                    <b>{$ll.banned()}:</b>
                    {#if localUser.ban}
                        {$ll.yes()}
                    {:else}
                        {$ll.no()}
                    {/if}
                </li>
                {#if localUser.ban}
                    <li><b>{$ll.banAuthor()}:</b> {localUser.ban.author.username}</li>
                    <li><b>{$ll.banReason()}:</b> {localUser.ban.reason}</li>
                    <li>
                        <b>{$ll.banDate()}:</b>
                        {dt.getFullDateAndTime(localUser.ban.date, data.tz, $currentLocale)}
                    </li>
                {/if}
                <li>
                    <b>{$ll.registrationDate()}:</b>
                    {dt.getFullDateAndTime(localUser.registrationDate, data.tz, $currentLocale)}
                </li>
            </ul>
        </div>
    </div>
    {#if $userData?.id === localUser.id}
        <div>
            <Button
                loading={$qcUploadAvatar.loading}
                variant="warning"
                onclick={() => avatarInput?.click()}
            >
                {$ll.uploadAvatar()}
            </Button>
            <input bind:this={avatarInput} class="u:hidden" type="file" onchange={onSelectFile} />
            {#if localUser.avatar}
                <Button variant="error" onclick={dialogAvatarRemoving?.open}>
                    {$ll.removeAvatar()}
                </Button>
            {/if}
            <Button variant="warning" onclick={dialogProfileEditing?.open}>
                {$ll.edit()}
            </Button>
            <Button variant="warning" onclick={dialogPasswordChanging?.open}>
                {$ll.changePassword()}
            </Button>
            {#if $userData.email}
                <Button variant="warning" onclick={dialogEmailChanging?.open}>
                    {$ll.changeEmail()}
                </Button>
            {:else}
                <Button variant="success" onclick={dialogEmailLinking?.open}>
                    {$ll.linkEmail()}
                </Button>
            {/if}
            {#if $userData.linkedAccounts?.email}
                <Button
                    loading={$qcEmailUnlink.loading}
                    variant="error"
                    onclick={qcEmailUnlink.refresh}
                >
                    {$ll.unlinkEmail()}
                </Button>
            {/if}
            <Button variant="error" onclick={dialogUserRemoving?.open}>
                {$ll.removeUser()}
            </Button>
        </div>
        <div>
            {#if !$userData.linkedAccounts?.twitch}
                <OAuthProviderButton linkAccount provider={constantsEnums.OAuthProvider.Twitch} />
            {/if}
        </div>
    {/if}
</Content.Default>

<DialogAvatarRemoving bind:this={dialogAvatarRemoving} bind:user={localUser} />
<DialogProfileEditing bind:this={dialogProfileEditing} bind:user={localUser} />
<DialogPasswordChanging bind:this={dialogPasswordChanging} />
<DialogEmailChanging bind:this={dialogEmailChanging} user={localUser} />
<DialogEmailLinking bind:this={dialogEmailLinking} />
<DialogUserRemoving bind:this={dialogUserRemoving} user={localUser} />
