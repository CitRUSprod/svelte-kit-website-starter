<script lang="ts">
    import { Content, Button } from "$lib/components"
    import { ModalAvatarRemoving, ModalProfileEditing, ModalPasswordChanging } from "./_components"

    import { onDestroy } from "svelte"
    import { useQuery } from "@sveltestack/svelte-query"
    import { t } from "$lib/locales"
    import { toasts, userData } from "$lib/stores"
    import { dt } from "$lib/utils"
    import * as api from "$lib/api"

    import type { PageData } from "./$types"

    export let data: PageData

    let avatarInput: HTMLInputElement
    let modalAvatarRemoving: ModalAvatarRemoving
    let modalProfileEditing: ModalProfileEditing
    let modalPasswordChanging: ModalPasswordChanging

    const queryDataUploadAvatar = {
        img: null as File | null
    }

    const queryUploadAvatar = useQuery("profile.uploadAvatar", {
        async queryFn() {
            if (queryDataUploadAvatar.img) {
                const res = await api.profile.uploadAvatar({
                    img: queryDataUploadAvatar.img
                })
                return res.data
            } else {
                throw new Error("File is not selected")
            }
        },
        async onSuccess() {
            const res = await api.users.getUser({
                id: data.user.id
            })
            data.user = res.data
            toasts.add("success", $t("routes.users.[id].avatar-updated-successfully"))
        },
        onError(err: any) {
            if (err.response) {
                toasts.add("error", err.response.data.message)
            } else {
                toasts.add("error", $t("global.error-occurred"))
            }
        }
    })

    const querySendConfirmationEmail = useQuery("profile.sendConfirmationEmail", {
        async queryFn() {
            const res = await api.profile.sendConfirmationEmail()
            return res.data
        },
        onSuccess() {
            toasts.add("success", $t("routes.users.[id].confirmation-email-sent"))
        },
        onError(err: any) {
            if (err.response) {
                toasts.add("error", err.response.data.message)
            } else {
                toasts.add("error", $t("global.error-occurred"))
            }
        }
    })

    async function onSelectFile(e: { currentTarget: HTMLInputElement }) {
        if (e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0]
            queryDataUploadAvatar.img = file
            await $queryUploadAvatar.refetch()
        }
    }

    onDestroy(() => {
        $querySendConfirmationEmail.remove()
    })
</script>

<svelte:head>
    <title>{$t("routes.users.[id].profile")}</title>
</svelte:head>

<Content.Default title={$t("routes.users.[id].profile")}>
    <div class="u:flex u:gap-4">
        <div class="u:w-50 u:h-50 u:overflow-hidden">
            <img
                class="u:w-full u:h-full u:object-cover"
                alt={$t("routes.users.[id].avatar")}
                src={data.user.avatar ?? "/img/no-avatar.png"}
            />
        </div>
        <div>
            <ul>
                <li><b>{$t("routes.users.[id].username")}:</b> {data.user.username}</li>
                {#if data.user.email}
                    <li><b>{$t("routes.users.[id].email")}:</b> {data.user.email}</li>
                    <li>
                        <b>{$t("routes.users.[id].confirmed-email")}:</b>
                        {$t(`routes.users.[id].${data.user.confirmedEmail ? "yes" : "no"}`)}
                    </li>
                {/if}
                <li><b>{$t("routes.users.[id].role")}:</b> {data.user.role.name}</li>
                <li>
                    <b>{$t("routes.users.[id].banned")}:</b>
                    {$t(`routes.users.[id].${data.user.banned ? "yes" : "no"}`)}
                </li>
                <li>
                    <b>{$t("routes.users.[id].registration-date")}:</b>
                    {dt.getFullDateAndTime(data.user.registrationDate)}
                </li>
            </ul>
        </div>
    </div>
    {#if $userData?.id === data.user.id}
        <div>
            <Button
                loading={$queryUploadAvatar.isFetching}
                type="warning"
                on:click={() => avatarInput.click()}
            >
                {$t("routes.users.[id].upload-avatar")}
            </Button>
            <input bind:this={avatarInput} class="u:hidden" type="file" on:change={onSelectFile} />
            {#if data.user.avatar}
                <Button type="error" on:click={modalAvatarRemoving.open}>
                    {$t("routes.users.[id].remove-avatar")}
                </Button>
            {/if}
            <Button type="warning" on:click={modalProfileEditing.open}>
                {$t("routes.users.[id].edit")}
            </Button>
            <Button type="warning" on:click={modalPasswordChanging.open}>
                {$t("routes.users.[id].change-password")}
            </Button>
            {#if !$userData.confirmedEmail}
                <Button
                    loading={$querySendConfirmationEmail.isFetching}
                    type="success"
                    on:click={() => $querySendConfirmationEmail.refetch()}
                >
                    {$t("routes.users.[id].verify-email")}
                </Button>
            {/if}
        </div>
    {/if}
</Content.Default>

<ModalAvatarRemoving bind:this={modalAvatarRemoving} bind:user={data.user} />
<ModalProfileEditing bind:this={modalProfileEditing} bind:user={data.user} />
<ModalPasswordChanging bind:this={modalPasswordChanging} />
