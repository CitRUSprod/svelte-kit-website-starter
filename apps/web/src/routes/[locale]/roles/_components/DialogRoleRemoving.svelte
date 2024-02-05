<script lang="ts">
    import { Button, Dialog } from "$lib/components"

    import { createEventDispatcher } from "svelte"
    import * as schemasModels from "@local/schemas/models"
    import { t } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as api from "$lib/api"

    const dispatch = createEventDispatcher()

    let dialog: Dialog

    let role: schemasModels.role.Role

    export function open(r: schemasModels.role.Role) {
        role = r

        dialog.open()
    }

    export function close() {
        dialog.close()
    }

    const qcDeleteRole = createQueryController({
        fn() {
            return api.roles.deleteRole({ id: role.id })
        },
        async onSuccess() {
            dispatch("removeRole")
            toasts.add("success", $t("components.dialog-role-removing.role-removed-successfully"))
            close()
        }
    })

    function defineAny(value: any) {
        return value
    }
</script>

<Dialog bind:this={dialog} class="u:flex u:flex-col u:gap-4 u:w-100">
    <div>
        <h1>{$t("components.dialog-role-removing.role-removing")}</h1>
    </div>
    <div>
        <p>
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html $t(
                "components.dialog-role-removing.role-removing-question",
                defineAny({ role: role.name })
            )}
        </p>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcDeleteRole.loading} text variant="success" on:click={close}>
            {$t("components.dialog-role-removing.cancel")}
        </Button>
        <Button loading={$qcDeleteRole.loading} variant="error" on:click={qcDeleteRole.refresh}>
            {$t("components.dialog-role-removing.remove")}
        </Button>
    </div>
</Dialog>
