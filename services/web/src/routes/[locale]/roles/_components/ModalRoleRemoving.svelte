<script lang="ts">
    import { Button, Modal } from "$lib/components"

    import { createEventDispatcher } from "svelte"
    import { t } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as api from "$lib/api"

    import type { RoleWithProtected } from "$lib/types"

    const dispatch = createEventDispatcher()

    let visible = false

    let role: RoleWithProtected

    export function open(r: RoleWithProtected) {
        role = r

        visible = true
    }

    export function close() {
        visible = false
    }

    const qcDeleteRole = createQueryController({
        fn() {
            return api.roles.deleteRole({ id: role.id })
        },
        async onSuccess() {
            dispatch("removeRole")
            toasts.add("success", $t("components.modal-role-removing.role-removed-successfully"))
            close()
        }
    })

    function defineAny(value: any) {
        return value
    }
</script>

<Modal class="u:flex u:flex-col u:gap-4 u:w-100" persistent={$qcDeleteRole.loading} bind:visible>
    <div>
        <h1>{$t("components.modal-role-removing.role-removing")}</h1>
    </div>
    <div>
        <p>
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html $t(
                "components.modal-role-removing.role-removing-question",
                defineAny({ role: role.name })
            )}
        </p>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcDeleteRole.loading} text type="success" on:click={close}>
            {$t("components.modal-role-removing.cancel")}
        </Button>
        <Button loading={$qcDeleteRole.loading} type="error" on:click={qcDeleteRole.refresh}>
            {$t("components.modal-role-removing.remove")}
        </Button>
    </div>
</Modal>
