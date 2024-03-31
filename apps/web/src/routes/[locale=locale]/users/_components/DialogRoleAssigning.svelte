<script lang="ts">
    import { Button, DropdownMenu, Dialog } from "$lib/components"

    import { createEventDispatcher } from "svelte"
    import * as schemasModels from "@local/schemas/models"
    import { ll } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as api from "$lib/api"

    export let roles: Array<schemasModels.role.Role>

    let dialog: Dialog

    const dispatch = createEventDispatcher()

    let userId = 0
    let username = ""
    let roleId = 0

    $: items = roles.map(r => ({ text: r.name, value: r.id }))

    export function open(user: schemasModels.user.User) {
        userId = user.id
        username = user.username
        roleId = user.role.id

        dialog.open()
    }

    export function close() {
        dialog.close()
    }

    const qcAssignRoleToUser = createQueryController({
        fn() {
            return api.users.assignRoleToUser({
                id: userId,
                roleId
            })
        },
        onSuccess() {
            dispatch("assignRole")
            toasts.add("success", $ll.$.$users.$$dialogRoleAssigning.roleEditedSuccessfully())
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
        <h1 class="u:text-center">{$ll.$.$users.$$dialogRoleAssigning.roleAssigning()}</h1>
    </div>
    <div>
        <h3 class="u:text-center">{$ll.$.$users.$$dialogRoleAssigning.user()}: {username}</h3>
    </div>
    <div>
        <DropdownMenu
            disabled={$qcAssignRoleToUser.loading}
            {items}
            label={$ll.$.$users.$$dialogRoleAssigning.role()}
            bind:value={roleId}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcAssignRoleToUser.loading} text variant="error" on:click={close}>
            {$ll.$.$users.$$dialogRoleAssigning.cancel()}
        </Button>
        <Button
            loading={$qcAssignRoleToUser.loading}
            variant="success"
            on:click={qcAssignRoleToUser.refresh}
        >
            {$ll.$.$users.$$dialogRoleAssigning.save()}
        </Button>
    </div>
</Dialog>
