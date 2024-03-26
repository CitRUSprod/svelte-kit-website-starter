<script lang="ts">
    import { Button, TextField, DropdownMenu, Dialog } from "$lib/components"

    import { createEventDispatcher } from "svelte"
    import * as constantsEnums from "@local/constants/enums"
    import * as schemasModels from "@local/schemas/models"
    import { ll } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    export let permissions: Array<constantsEnums.Permission>

    const dispatch = createEventDispatcher()

    let dialog: Dialog

    let roleId = 0
    let name = ""
    let currentPermission: constantsEnums.Permission | null = null
    let selectedPermissions: Array<constantsEnums.Permission> = []

    $: vldResultName = vld.role.name(name)

    $: items = permissions
        .filter(p => !selectedPermissions.includes(p))
        .map(p => ({ text: p, value: p }))

    export function open(role: schemasModels.role.Role) {
        roleId = role.id
        name = role.name
        currentPermission = null
        selectedPermissions = [...role.permissions]

        dialog.open()
    }

    export function close() {
        dialog.close()
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
            toasts.add("success", $ll.$.$roles.$$dialogRoleEditing.roleEditedSuccessfully())
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

    function removePermission(permission: constantsEnums.Permission) {
        selectedPermissions = selectedPermissions.filter(p => p !== permission)
    }
</script>

<Dialog
    bind:this={dialog}
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={$qcUpdateRole.loading}
>
    <div>
        <h1 class="u:text-center">{$ll.$.$roles.$$dialogRoleEditing.roleEditing()}</h1>
    </div>
    <div>
        <TextField
            disabled={$qcUpdateRole.loading}
            label={$ll.$.$roles.$$dialogRoleEditing.name()}
            bind:value={name}
        />
    </div>
    <div>
        <div class="u:relative u:border u:border-default u:rounded">
            <div
                class="u:absolute u:left-3 u:top--1.8 u:px-0.5 u:bg-content u:text-default u:text-xs u:select-none u:pointer-events-none u:z-1"
            >
                {$ll.$.$roles.$$dialogRoleEditing.permissions()}
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
                        ({$ll.$.$roles.$$dialogRoleEditing.empty()})
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
                label={$ll.$.$roles.$$dialogRoleEditing.permission()}
                bind:value={currentPermission}
            />
        </div>
        <div>
            <Button
                disabled={!currentPermission || $qcUpdateRole.loading}
                variant="success"
                on:click={addPermission}
            >
                {$ll.$.$roles.$$dialogRoleEditing.add()}
            </Button>
        </div>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcUpdateRole.loading} text variant="error" on:click={close}>
            {$ll.$.$roles.$$dialogRoleEditing.cancel()}
        </Button>
        <Button
            disabled={!vldResultName.valid}
            loading={$qcUpdateRole.loading}
            variant="success"
            on:click={qcUpdateRole.refresh}
        >
            {$ll.$.$roles.$$dialogRoleEditing.save()}
        </Button>
    </div>
</Dialog>
