<script lang="ts">
    import * as schemasRoutes from "@repo/schemas/routes"

    import { ll, currentLocale } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Button, Dialog } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"

    type Role = schemasRoutes.roles.$GetRolesResponse["items"][number]

    interface Props {
        onRemoveRole?(): void
    }

    const { onRemoveRole = undefined }: Props = $props()

    let dialog = $state<Dialog>()

    let role = $state<Role | null>()

    export function open(r: Role) {
        role = r

        dialog?.open()
    }

    export function close() {
        role = null

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
    class="u:w-100"
    contentClass="u:flex u:flex-col u:gap-4"
    title={$ll.roleRemoving()}
    persistent={qDeleteRole.loading}
>
    <div>
        <p>
            {@html $ll.roleRemovingQuestion({ role: role?.name[$currentLocale] })}
        </p>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={qDeleteRole.loading} text variant="success" onClick={close}>
            {$ll.cancel()}
        </Button>
        <Button loading={qDeleteRole.loading} variant="error" onClick={qDeleteRole.refetch}>
            {$ll.remove()}
        </Button>
    </div>
</Dialog>
