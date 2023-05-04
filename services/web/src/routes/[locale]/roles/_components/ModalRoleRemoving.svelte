<script lang="ts">
    import { Button, Modal } from "$lib/components"

    import { createEventDispatcher } from "svelte"
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
            toasts.add("success", "Роль успешно удалена")
            close()
        }
    })
</script>

<Modal class="u:flex u:flex-col u:gap-4 u:w-100" persistent={$qcDeleteRole.loading} bind:visible>
    <div>
        <h1>Удаление роли</h1>
    </div>
    <div>
        <p>Вы уверены, что хотите удалить роль <b>{role.name}</b>?</p>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcDeleteRole.loading} text type="success" on:click={close}>
            Отмена
        </Button>
        <Button loading={$qcDeleteRole.loading} type="error" on:click={qcDeleteRole.refresh}>
            Удалить
        </Button>
    </div>
</Modal>
