<script lang="ts">
    import * as schemasModels from "@local/schemas/models"

    import { ll, currentLocale } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Button, Dialog } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"

    interface Props {
        onRemoveRole?(): void
    }

    const { onRemoveRole = undefined }: Props = $props()

    let dialog = $state<Dialog>()

    let role = $state<schemasModels.role.Role>()

    export function open(r: schemasModels.role.Role) {
        role = r

        dialog?.open()
    }

    export function close() {
        dialog?.close()
    }

    const qDeleteRole = useQuery({
        fn() {
            return api.roles.deleteRole({ id: role?.id ?? 0 })
        },
        async onSuccess() {
            onRemoveRole?.()
            toasts.add("success", $ll.roleRemovedSuccessfully())
            close()
        }
    })
</script>

<Dialog
    bind:this={dialog}
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={qDeleteRole.loading}
>
    <div>
        <h1>{$ll.roleRemoving()}</h1>
    </div>
    <div>
        <p>
            {@html $ll.roleRemovingQuestion({ role: role?.name[$currentLocale] })}
        </p>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={qDeleteRole.loading} text variant="success" onclick={close}>
            {$ll.cancel()}
        </Button>
        <Button loading={qDeleteRole.loading} variant="error" onclick={qDeleteRole.refetch}>
            {$ll.remove()}
        </Button>
    </div>
</Dialog>
