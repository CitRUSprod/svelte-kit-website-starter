<script lang="ts">
    import * as schemasRoutes from "@repo/schemas/routes"

    import { ll, currentLocale } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Button, Select, Dialog } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"

    type Role = schemasRoutes.roles.$GetRolesResponse["items"][number]
    type User = schemasRoutes.users.$GetUsersResponse["items"][number]

    interface Props {
        roles: Array<Role>
        onAssignRole?(): void
    }

    const { roles, onAssignRole = undefined }: Props = $props()

    let dialog = $state<Dialog>()

    let userId = 0
    let username = $state("")
    let roleId = $state("0")

    const items = $derived(
        roles.map(r => ({ text: r.name[$currentLocale], value: r.id.toString() }))
    )

    export function open(user: User) {
        userId = user.id
        username = user.username
        roleId = user.role.id.toString()

        dialog?.open()
    }

    export function close() {
        userId = 0
        username = ""
        roleId = "0"

        dialog?.close()
    }

    const qAssignRoleToUser = useQuery({
        fn() {
            return api.users.assignRoleToUser({
                id: userId,
                roleId: parseInt(roleId)
            })
        },
        onSuccess() {
            onAssignRole?.()
            toasts.add("success", $ll.roleEditedSuccessfully())
            close()
        }
    })
</script>

<Dialog
    bind:this={dialog}
    class="u:w-100"
    contentClass="u:flex u:flex-col u:gap-4"
    title={$ll.roleAssigning()}
    persistent={qAssignRoleToUser.loading}
>
    <div>
        <h3 class="u:text-center">{$ll.user()}: {username}</h3>
    </div>
    <div>
        <Select
            disabled={qAssignRoleToUser.loading}
            {items}
            label={$ll.role()}
            bind:value={roleId}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={qAssignRoleToUser.loading} text variant="error" onClick={close}>
            {$ll.cancel()}
        </Button>
        <Button
            loading={qAssignRoleToUser.loading}
            variant="success"
            onClick={qAssignRoleToUser.refetch}
        >
            {$ll.save()}
        </Button>
    </div>
</Dialog>
