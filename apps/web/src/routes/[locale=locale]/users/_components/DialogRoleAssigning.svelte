<script lang="ts">
    import * as schemasModels from "@local/schemas/models"

    import { ll, currentLocale } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Button, DropdownMenu, Dialog } from "$lib/components"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"

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

    const qcAssignRoleToUser = createQueryController({
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
    persistent={$qcAssignRoleToUser.loading}
>
    <div>
        <h1 class="u:text-center">{$ll.roleAssigning()}</h1>
    </div>
    <div>
        <h3 class="u:text-center">{$ll.user()}: {username}</h3>
    </div>
    <div>
        <DropdownMenu
            disabled={$qcAssignRoleToUser.loading}
            {items}
            label={$ll.role()}
            bind:value={roleId}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcAssignRoleToUser.loading} text variant="error" onclick={close}>
            {$ll.cancel()}
        </Button>
        <Button
            loading={$qcAssignRoleToUser.loading}
            variant="success"
            onclick={qcAssignRoleToUser.refresh}
        >
            {$ll.save()}
        </Button>
    </div>
</Dialog>
