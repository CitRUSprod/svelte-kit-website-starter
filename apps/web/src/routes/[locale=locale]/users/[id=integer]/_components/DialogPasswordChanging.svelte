<script lang="ts">
    import { ll } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Button, TextField, Dialog } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"
    import * as vld from "$lib/validators"

    let dialog = $state<Dialog>()

    let oldPassword = $state("")
    let newPassword = $state("")

    const vldResultOldPassword = $derived(vld.user.password(oldPassword))
    const vldResultNewPassword = $derived(vld.user.password(newPassword))

    const completedForm = $derived(
        vldResultOldPassword.valid &&
            vldResultNewPassword.valid &&
            vldResultOldPassword.value !== vldResultNewPassword.value
    )

    export function open() {
        oldPassword = ""
        newPassword = ""

        dialog?.open()
    }

    export function close() {
        dialog?.close()
    }

    const qChangePassword = useQuery({
        fn() {
            return api.profile.changePassword({
                oldPassword: vldResultOldPassword.value,
                newPassword: vldResultNewPassword.value
            })
        },
        onSuccess() {
            toasts.add("success", $ll.passwordChangedSuccessfully())
            close()
        }
    })
</script>

<Dialog
    bind:this={dialog}
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={qChangePassword.loading}
>
    <div>
        <h1 class="u:text-center">
            {$ll.passwordChanging()}
        </h1>
    </div>
    <div>
        <TextField
            disabled={qChangePassword.loading}
            label={$ll.oldPassword()}
            type="password"
            bind:value={oldPassword}
        />
    </div>
    <div>
        <TextField
            disabled={qChangePassword.loading}
            label={$ll.newPassword()}
            type="password"
            bind:value={newPassword}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={qChangePassword.loading} text variant="error" onclick={close}>
            {$ll.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={qChangePassword.loading}
            variant="success"
            onclick={qChangePassword.refetch}
        >
            {$ll.change()}
        </Button>
    </div>
</Dialog>
