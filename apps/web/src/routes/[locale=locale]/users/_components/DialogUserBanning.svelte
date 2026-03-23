<script lang="ts">
    import * as schemasRoutes from "@repo/schemas/routes"

    import { ll } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Button, TextField, Dialog } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"
    import * as vld from "$lib/validators"

    type User = schemasRoutes.users.$GetUsersResponse["items"][number]

    let dialog = $state<Dialog>()

    interface Props {
        onBanUser?(): void
    }

    const { onBanUser = undefined }: Props = $props()

    let userId = 0
    let username = $state("")
    let reason = $state("")

    const vldResultReason = $derived(vld.ban.reason(reason))

    const completedForm = $derived(vldResultReason.valid)

    export function open(user: User) {
        userId = user.id
        username = user.username
        reason = ""

        dialog?.open()
    }

    export function close() {
        userId = 0
        username = ""
        reason = ""

        dialog?.close()
    }

    const qBanUser = useQuery({
        fn() {
            return api.users.banUser({
                id: userId,
                reason: vldResultReason.value
            })
        },
        async onSuccess() {
            onBanUser?.()
            toasts.add("success", $ll.userBannedSuccessfully())
            close()
        }
    })
</script>

<Dialog
    bind:this={dialog}
    class="u:w-100"
    contentClass="u:flex u:flex-col u:gap-4"
    title={$ll.userBanning()}
    persistent={qBanUser.loading}
>
    <div>
        <h3 class="u:text-center">{$ll.user()}: {username}</h3>
    </div>
    <div>
        <TextField
            disabled={qBanUser.loading}
            label={$ll.reason()}
            placeholder={$ll.enterReason()}
            bind:value={reason}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={qBanUser.loading} text variant="error" onClick={close}>
            {$ll.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={qBanUser.loading}
            variant="success"
            onClick={qBanUser.refetch}
        >
            {$ll.ban()}
        </Button>
    </div>
</Dialog>
