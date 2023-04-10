<script lang="ts">
    import { Button, DropdownMenu, Modal } from "$lib/components"

    import { onDestroy, createEventDispatcher } from "svelte"
    import { useQuery } from "@sveltestack/svelte-query"
    import { t } from "$lib/locales"
    import { toasts } from "$lib/stores"
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

    const queryAssignRoleToUser = useQuery("users.assignRoleToUser", {
        async queryFn() {
            const res = await api.users.assignRoleToUser({
                id: userId,
                roleId
            })
            return res.data
        },
        onSuccess() {
            dispatch("assignRole")
            toasts.add("success", "Role successfully edited")
            close()
        },
        onError(err: any) {
            if (err.response) {
                toasts.add("error", err.response.data.message)
            } else {
                toasts.add("error", "An error has occurred")
            }
        }
    })

    onDestroy(() => {
        $queryAssignRoleToUser.remove()
    })
</script>

<Modal
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={$queryAssignRoleToUser.isFetching}
    bind:visible
>
    <div>
        <h1 class="u:text-center">{$t("components.modal-role-assigning.role-assigning")}</h1>
    </div>
    <div>
        <DropdownMenu
            disabled={$queryAssignRoleToUser.isFetching}
            {items}
            label={$t("components.modal-role-assigning.role")}
            bind:value={roleId}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$queryAssignRoleToUser.isFetching} text type="error" on:click={close}>
            {$t("components.modal-role-assigning.cancel")}
        </Button>
        <Button
            loading={$queryAssignRoleToUser.isFetching}
            type="success"
            on:click={() => $queryAssignRoleToUser.refetch()}
        >
            {$t("components.modal-role-assigning.save")}
        </Button>
    </div>
</Modal>
