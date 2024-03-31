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

    const dispatch = createEventDispatcher()

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
            toasts.add("success", $ll.$.$users.$$dialogUserBanning.userBannedSuccessfully())
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
        <h1 class="u:text-center">{$ll.$.$users.$$dialogUserBanning.userBanning()}</h1>
    </div>
    <div>
        <h3 class="u:text-center">{$ll.$.$users.$$dialogUserBanning.user()}: {username}</h3>
    </div>
    <div>
        <TextField
            disabled={$qcBanUser.loading}
            label={$ll.$.$users.$$dialogUserBanning.reason()}
            placeholder={$ll.$.$users.$$dialogUserBanning.enterReason()}
            bind:value={reason}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcBanUser.loading} text variant="error" on:click={close}>
            {$ll.$.$users.$$dialogUserBanning.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$qcBanUser.loading}
            variant="success"
            on:click={qcBanUser.refresh}
        >
            {$ll.$.$users.$$dialogUserBanning.ban()}
        </Button>
    </div>
</Dialog>
