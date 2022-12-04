<script lang="ts">
    import { Button, TextField, Modal } from "$lib/components"

    import { onDestroy } from "svelte"
    import { useQuery } from "@sveltestack/svelte-query"
    import { toasts } from "$lib/stores"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    let visible = false

    let oldPassword = ""
    let newPassword = ""

    $: vldResultOldPassword = vld.user.password(oldPassword)
    $: vldResultNewPassword = vld.user.password(newPassword)

    $: completedForm =
        vldResultOldPassword.valid &&
        vldResultNewPassword.valid &&
        vldResultOldPassword.value !== vldResultNewPassword.value

    export function open() {
        oldPassword = ""
        newPassword = ""

        visible = true
    }

    export function close() {
        visible = false
    }

    const queryChangePassword = useQuery("profile.changePassword", {
        async queryFn() {
            const res = await api.profile.changePassword({
                oldPassword: vldResultOldPassword.value,
                newPassword: vldResultNewPassword.value
            })
            return res.data
        },
        onSuccess() {
            toasts.add("success", "Password successfully changed")
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
        $queryChangePassword.remove()
    })
</script>

<Modal
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={$queryChangePassword.isFetching}
    bind:visible
>
    <div>
        <h1 class="u:text-center">Password changing</h1>
    </div>
    <div>
        <TextField
            disabled={$queryChangePassword.isFetching}
            label="Old password"
            valueType="password"
            bind:value={oldPassword}
        />
    </div>
    <div>
        <TextField
            disabled={$queryChangePassword.isFetching}
            label="New password"
            valueType="password"
            bind:value={newPassword}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$queryChangePassword.isFetching} text type="error" on:click={close}>
            Cancel
        </Button>
        <Button
            disabled={!completedForm}
            loading={$queryChangePassword.isFetching}
            type="success"
            on:click={() => $queryChangePassword.refetch()}
        >
            Change
        </Button>
    </div>
</Modal>
