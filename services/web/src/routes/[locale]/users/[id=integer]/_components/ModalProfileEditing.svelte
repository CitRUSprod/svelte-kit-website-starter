<script lang="ts">
    import { Button, TextField, Modal } from "$lib/components"

    import { onDestroy } from "svelte"
    import { useQuery } from "@sveltestack/svelte-query"
    import { t } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    import type { User } from "$lib/types"

    export let user: User

    let visible = false

    let username = ""
    let email = ""

    $: vldResultUsername = vld.user.username(username)
    $: vldResultEmail = vld.user.email(email)

    $: completedForm =
        vldResultUsername.valid &&
        vldResultEmail.valid &&
        (vldResultUsername.value !== user.username || vldResultEmail.value !== user.email)

    export function open() {
        username = user.username
        email = user.email ?? ""

        visible = true
    }

    export function close() {
        visible = false
    }

    const queryUpdateUser = useQuery("profile.updateUser", {
        async queryFn() {
            const res = await api.profile.updateUser({
                email: vldResultEmail.value,
                username: vldResultUsername.value
            })
            return res.data
        },
        onSuccess(localUser) {
            user = localUser
            toasts.add("success", "Profile successfully edited")
            close()
        },
        onError(err: any) {
            if (err.response) {
                toasts.add("error", err.response.data.message)
            } else {
                toasts.add("error", "An error has occurred")
            }
        }
    })

    onDestroy(() => {
        $queryUpdateUser.remove()
    })
</script>

<Modal
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={$queryUpdateUser.isFetching}
    bind:visible
>
    <div>
        <h1 class="u:text-center">{$t("components.modal-profile-editing.profile-editing")}</h1>
    </div>
    <div>
        <TextField
            disabled={$queryUpdateUser.isFetching}
            label={$t("components.modal-profile-editing.username")}
            bind:value={username}
        />
    </div>
    <div>
        <TextField
            disabled={$queryUpdateUser.isFetching}
            label={$t("components.modal-profile-editing.email")}
            bind:value={email}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$queryUpdateUser.isFetching} text type="error" on:click={close}>
            {$t("components.modal-profile-editing.cancel")}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$queryUpdateUser.isFetching}
            type="success"
            on:click={() => $queryUpdateUser.refetch()}
        >
            {$t("components.modal-profile-editing.save")}
        </Button>
    </div>
</Modal>
