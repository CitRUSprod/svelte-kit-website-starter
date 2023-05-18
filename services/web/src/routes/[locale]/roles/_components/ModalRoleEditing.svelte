<script lang="ts">
    import { Button, TextField, DropdownMenu, Modal } from "$lib/components"

    import { createEventDispatcher } from "svelte"
    import { t } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    import type { Permission } from "$lib/enums"
    import type { RoleWithProtected } from "$lib/types"

    export let permissions: Array<Permission>

    const dispatch = createEventDispatcher()

    let visible = false

    let roleId = 0
    let name = ""
    let currentPermission: Permission | null = null
    let selectedPermissions: Array<Permission> = []

    $: vldResultName = vld.role.name(name)

    $: items = permissions
        .filter(p => !selectedPermissions.includes(p))
        .map(p => ({ text: p, value: p }))

    export function open(role: RoleWithProtected) {
        roleId = role.id
        name = role.name
        currentPermission = null
        selectedPermissions = [...role.permissions]

        visible = true
    }

    export function close() {
        visible = false
    }

    const qcUpdateRole = createQueryController({
        fn() {
            return api.roles.updateRole({
                id: roleId,
                name: vldResultName.value,
                permissions: selectedPermissions
            })
        },
        async onSuccess() {
            dispatch("editRole")
            toasts.add("success", $t("components.modal-role-editing.role-edited-successfully"))
            close()
        }
    })

    function addPermission() {
        if (currentPermission) {
            selectedPermissions.push(currentPermission)
            selectedPermissions = selectedPermissions
            currentPermission = null
        }
    }

    function removePermission(permission: Permission) {
        selectedPermissions = selectedPermissions.filter(p => p !== permission)
    }
</script>

<Modal class="u:flex u:flex-col u:gap-4 u:w-100" persistent={$qcUpdateRole.loading} bind:visible>
    <div>
        <h1 class="u:text-center">{$t("components.modal-role-editing.role-editing")}</h1>
    </div>
    <div>
        <TextField
            disabled={$qcUpdateRole.loading}
            label={$t("components.modal-role-editing.name")}
            bind:value={name}
        />
    </div>
    <div>
        <div class="u:relative u:border u:border-default u:rounded">
            <div
                class="u:absolute u:left-3 u:top--1.8 u:px-0.5 u:bg-content u:text-default u:text-xs u:select-none u:pointer-events-none u:z-1"
            >
                {$t("components.modal-role-editing.permissions")}
            </div>
            <div class="u:flex u:flex-wrap u:gap-1 u:p-3">
                {#each selectedPermissions as permission (permission)}
                    <div class="u:flex u:items-center u:px-1 u:bg-info u:rounded">
                        <span>{permission}</span>
                        <button
                            class="u:flex u:ml-1 u:text-xs u:cursor-pointer"
                            disabled={$qcUpdateRole.loading}
                            on:click={() => removePermission(permission)}
                        >
                            <i class="u:i-fa-solid-times" />
                        </button>
                    </div>
                {:else}
                    <div class="u:w-full u:text-center u:opacity-30">
                        ({$t("components.modal-role-editing.empty")})
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <div class="u:flex u:gap-1">
        <div class="u:flex-1">
            <DropdownMenu
                disabled={items.length === 0 || $qcUpdateRole.loading}
                {items}
                label={$t("components.modal-role-editing.permission")}
                bind:value={currentPermission}
            />
        </div>
        <div>
            <Button
                disabled={!currentPermission || $qcUpdateRole.loading}
                type="success"
                on:click={addPermission}
            >
                {$t("components.modal-role-editing.add")}
            </Button>
        </div>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcUpdateRole.loading} text type="error" on:click={close}>
            {$t("components.modal-role-editing.cancel")}
        </Button>
        <Button
            disabled={!vldResultName.valid}
            loading={$qcUpdateRole.loading}
            type="success"
            on:click={qcUpdateRole.refresh}
        >
            {$t("components.modal-role-editing.save")}
        </Button>
    </div>
</Modal>
