<script lang="ts">
    import { Button, DropdownMenu, Dialog } from "$lib/components"

    import { createEventDispatcher } from "svelte"
    import * as schemasModels from "@local/schemas/models"
    import { t } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as api from "$lib/api"

    export let roles: Array<schemasModels.role.Role>

    let dialog: Dialog

    const dispatch = createEventDispatcher()

    let userId = 0
    let roleId = 0

    $: items = roles.map(r => ({ text: r.name, value: r.id }))

    export function open(user: schemasModels.user.User) {
        userId = user.id
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
            toasts.add("success", $t("components.dialog-role-assigning.role-edited-successfully"))
            close()
        }
    })
</script>

<Dialog bind:this={dialog} class="u:flex u:flex-col u:gap-4 u:w-100">
    <div>
        <h1 class="u:text-center">{$t("components.dialog-role-assigning.role-assigning")}</h1>
    </div>
    <div>
        <DropdownMenu
            disabled={$qcAssignRoleToUser.loading}
            {items}
            label={$t("components.dialog-role-assigning.role")}
            bind:value={roleId}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcAssignRoleToUser.loading} text variant="error" on:click={close}>
            {$t("components.dialog-role-assigning.cancel")}
        </Button>
        <Button
            loading={$qcAssignRoleToUser.loading}
            variant="success"
            on:click={qcAssignRoleToUser.refresh}
        >
            {$t("components.dialog-role-assigning.save")}
        </Button>
    </div>
</Dialog>
