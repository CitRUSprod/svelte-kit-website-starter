<script lang="ts">
    import { Button, TextField, Dialog } from "$lib/components"

    import { createEventDispatcher } from "svelte"
    import * as schemasModels from "@local/schemas/models"
    import { ll } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    let dialog: Dialog

    const dispatch = createEventDispatcher<{ banUser: undefined }>()

    let userId = 0
    let username = ""
    let reason = ""

    $: vldResultReason = vld.ban.reason(reason)

    $: completedForm = vldResultReason.valid

    export function open(user: schemasModels.user.User) {
        userId = user.id
        username = user.username
        reason = ""

        dialog.open()
    }

    export function close() {
        dialog.close()
    }

    const qcBanUser = createQueryController({
        fn() {
            return api.users.banUser({
                id: userId,
                reason: vldResultReason.value
            })
        },
        async onSuccess() {
            dispatch("banUser")
            toasts.add("success", $ll.userBannedSuccessfully())
            close()
        }
    })
</script>

<Dialog
    bind:this={dialog}
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={$qcBanUser.loading}
>
    <div>
        <h1 class="u:text-center">{$ll.userBanning()}</h1>
    </div>
    <div>
        <h3 class="u:text-center">{$ll.user()}: {username}</h3>
    </div>
    <div>
        <TextField
            disabled={$qcBanUser.loading}
            label={$ll.reason()}
            placeholder={$ll.enterReason()}
            bind:value={reason}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcBanUser.loading} text variant="error" on:click={close}>
            {$ll.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$qcBanUser.loading}
            variant="success"
            on:click={qcBanUser.refresh}
        >
            {$ll.ban()}
        </Button>
    </div>
</Dialog>
