<script lang="ts">
    import * as constantsEnums from "@repo/constants/enums"
    import { dt } from "@repo/utils"
    import * as _ from "es-toolkit"
    import { watch } from "runed"
    import { untrack } from "svelte"

    import {
        DialogAvatarRemoving,
        DialogProfileEditing,
        DialogPasswordChanging,
        DialogEmailChanging,
        DialogEmailLinking,
        DialogUserRemoving
    } from "./_components"

    import { ll, currentLocale } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { ContentDefault, Button, OAuthProviderButton } from "$lib/components"
    import { env } from "$lib/constants"
    import { useQuery } from "$lib/hooks"
    import { toasts, user } from "$lib/stores"

    const { data } = $props()

    let avatarInput = $state<HTMLInputElement>()
    let dialogAvatarRemoving = $state<DialogAvatarRemoving>()
    let dialogProfileEditing = $state<DialogProfileEditing>()
    let dialogPasswordChanging = $state<DialogPasswordChanging>()
    let dialogEmailChanging = $state<DialogEmailChanging>()
    let dialogEmailLinking = $state<DialogEmailLinking>()
    let dialogUserRemoving = $state<DialogUserRemoving>()

    let localUser = $state(untrack(() => data.user))

    watch(
        () => data.user,
        u => {
            localUser = u
        }
    )

    const hasMoreThanOneLinkedAccount = $derived(
        Object.values(user.data?.linkedAccounts ?? {}).filter(value => value).length > 1
    )

    let uploadAvatarImg = $state<File | null>(null)

    const qUploadAvatar = useQuery({
        async fn() {
            if (uploadAvatarImg) {
                const res = await api.temporaryStorage.uploadImage({
                    img: uploadAvatarImg
                })

                return api.profile.updateUser({
                    imgTempId: res.data.id
                })
            } else {
                throw new Error("File is not selected")
            }
        },
        async onSuccess() {
            const res = await api.users.getUser({
                id: data.user.id
            })
            user.data = res.data
            localUser = res.data
            toasts.add("success", $ll.avatarUpdatedSuccessfully())
        }
    })

    async function onSelectFile(e: { currentTarget: HTMLInputElement }) {
        if (e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0]!
            uploadAvatarImg = file
            await qUploadAvatar.refetch()
        }
    }

    const qEmailUnlink = useQuery({
        fn() {
            return api.auth.unlink()
        },
        async onSuccess() {
            toasts.add("success", $ll.confirmationEmailSent())
        }
    })

    const qTwitchUnlink = useQuery({
        fn() {
            return api.auth.oAuthUnlink({
                provider: _.kebabCase(constantsEnums.OAuthProvider.Twitch)
            })
        },
        async onSuccess(u) {
            user.data = u
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

<ContentDefault title={$ll.profile()}>
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
                {#if user.data?.id === localUser.id && user.data.linkedAccounts}
                    <li>
                        <b>Twitch:</b>
                        {#if user.data.linkedAccounts.twitch}
                            {$ll.linked()}
                            {#if hasMoreThanOneLinkedAccount}
                                <Button
                                    loading={qTwitchUnlink.loading}
                                    variant="error"
                                    onClick={qTwitchUnlink.refetch}
                                >
                                    {$ll.unlink()}
                                </Button>
                            {/if}
                        {:else}
                            {$ll.unlinked()}
                        {/if}
                    </li>
                {/if}
                <li><b>{$ll.role()}:</b> {localUser.role.name[$currentLocale]}</li>
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
    {#if user.data?.id === localUser.id}
        <div>
            <Button
                loading={qUploadAvatar.loading}
                variant="warning"
                onClick={() => avatarInput?.click()}
            >
                {$ll.uploadAvatar()}
            </Button>
            <input bind:this={avatarInput} class="u:hidden" type="file" onchange={onSelectFile} />
            {#if localUser.avatar}
                <Button variant="error" onClick={dialogAvatarRemoving?.open}>
                    {$ll.removeAvatar()}
                </Button>
            {/if}
            <Button variant="warning" onClick={dialogProfileEditing?.open}>
                {$ll.edit()}
            </Button>
            <Button variant="warning" onClick={dialogPasswordChanging?.open}>
                {$ll.changePassword()}
            </Button>
            {#if user.data.email}
                <Button variant="warning" onClick={dialogEmailChanging?.open}>
                    {$ll.changeEmail()}
                </Button>
            {:else}
                <Button variant="success" onClick={dialogEmailLinking?.open}>
                    {$ll.linkEmail()}
                </Button>
            {/if}
            {#if user.data.linkedAccounts.email}
                <Button
                    loading={qEmailUnlink.loading}
                    variant="error"
                    onClick={qEmailUnlink.refetch}
                >
                    {$ll.unlinkEmail()}
                </Button>
            {/if}
            <Button
                variant="error"
                onClick={dialogUserRemoving?.open}
                data-testid="remove-user-button"
            >
                {$ll.removeUser()}
            </Button>
        </div>
        {#if env.PUBLIC_ENABLE_TWITCH_AUTH && !user.data.linkedAccounts.twitch}
            <div>
                <OAuthProviderButton linkAccount provider={constantsEnums.OAuthProvider.Twitch} />
            </div>
        {/if}
    {/if}
</ContentDefault>

<DialogAvatarRemoving bind:this={dialogAvatarRemoving} bind:user={localUser} />
<DialogProfileEditing bind:this={dialogProfileEditing} bind:user={localUser} />
<DialogPasswordChanging bind:this={dialogPasswordChanging} />
<DialogEmailChanging bind:this={dialogEmailChanging} user={localUser} />
<DialogEmailLinking bind:this={dialogEmailLinking} />
<DialogUserRemoving bind:this={dialogUserRemoving} user={localUser} />
