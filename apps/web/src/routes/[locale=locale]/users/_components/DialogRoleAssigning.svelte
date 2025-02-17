<script lang="ts">
    import * as schemasModels from "@local/schemas/models"

    import { ll, currentLocale } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Button, DropdownMenu, Dialog } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"

    interface Props {
        roles: Array<schemasModels.role.Role>
        onAssignRole?(): void
    }

    const { roles, onAssignRole = undefined }: Props = $props()

    let dialog = $state<Dialog>()

    let userId = 0
    let username = $state("")
    let roleId = $state(0)

    const items = $derived(roles.map(r => ({ text: r.name[$currentLocale], value: r.id })))

    export function open(user: schemasModels.user.User) {
        userId = user.id
        username = user.username
        roleId = user.role.id

        dialog?.open()
    }

    export function close() {
        dialog?.close()
    }

    const qAssignRoleToUser = useQuery({
        fn() {
            return api.users.assignRoleToUser({
                id: userId,
                roleId
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
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={qAssignRoleToUser.loading}
>
    <div>
        <h1 class="u:text-center">{$ll.roleAssigning()}</h1>
    </div>
    <div>
        <h3 class="u:text-center">{$ll.user()}: {username}</h3>
    </div>
    <div>
        <DropdownMenu
            disabled={qAssignRoleToUser.loading}
            {items}
            label={$ll.role()}
            bind:value={roleId}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={qAssignRoleToUser.loading} text variant="error" onclick={close}>
            {$ll.cancel()}
        </Button>
        <Button
            loading={qAssignRoleToUser.loading}
            variant="success"
            onclick={qAssignRoleToUser.refetch}
        >
            {$ll.save()}
        </Button>
    </div>
</Dialog>
