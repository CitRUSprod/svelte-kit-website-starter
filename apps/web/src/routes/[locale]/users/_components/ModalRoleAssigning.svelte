<script lang="ts">
    import { Button, DropdownMenu, Modal } from "$lib/components"

    import { createEventDispatcher } from "svelte"
    import { t } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as api from "$lib/api"

    import type { User, Role } from "$lib/types"

    export let roles: Array<Role>

    const dispatch = createEventDispatcher()

    let visible = false

    let userId = 0
    let roleId = 0

    $: items = roles.map(r => ({ text: r.name, value: r.id }))

    export function open(user: User) {
        userId = user.id
        roleId = user.role.id

        visible = true
    }

    export function close() {
        visible = false
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
            toasts.add("success", $t("components.modal-role-assigning.role-edited-successfully"))
            close()
        }
    })
</script>

<Modal
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={$qcAssignRoleToUser.loading}
    bind:visible
>
    <div>
        <h1 class="u:text-center">{$t("components.modal-role-assigning.role-assigning")}</h1>
    </div>
    <div>
        <DropdownMenu
            disabled={$qcAssignRoleToUser.loading}
            {items}
            label={$t("components.modal-role-assigning.role")}
            bind:value={roleId}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcAssignRoleToUser.loading} text variant="error" on:click={close}>
            {$t("components.modal-role-assigning.cancel")}
        </Button>
        <Button
            loading={$qcAssignRoleToUser.loading}
            variant="success"
            on:click={qcAssignRoleToUser.refresh}
        >
            {$t("components.modal-role-assigning.save")}
        </Button>
    </div>
</Modal>
