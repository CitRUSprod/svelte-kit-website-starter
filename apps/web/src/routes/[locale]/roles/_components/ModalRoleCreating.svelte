<script lang="ts">
    import { Button, TextField, DropdownMenu, Modal } from "$lib/components"

    import { createEventDispatcher } from "svelte"
    import { t } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    import type { Permission } from "$lib/enums"

    export let permissions: Array<Permission>

    const dispatch = createEventDispatcher()

    let visible = false

    let name = ""
    let currentPermission: Permission | null = null
    let selectedPermissions: Array<Permission> = []

    $: vldResultName = vld.role.name(name)

    $: items = permissions
        .filter(p => !selectedPermissions.includes(p))
        .map(p => ({ text: p, value: p }))

    export function open() {
        name = ""
        currentPermission = null
        selectedPermissions = []

        visible = true
    }

    export function close() {
        visible = false
    }

    const qcCreateRole = createQueryController({
        fn() {
            return api.roles.createRole({
                name: vldResultName.value,
                permissions: selectedPermissions
            })
        },
        async onSuccess() {
            dispatch("createRole")
            toasts.add("success", $t("components.modal-role-creating.role-created-successfully"))
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

<Modal class="u:flex u:flex-col u:gap-4 u:w-100" persistent={$qcCreateRole.loading} bind:visible>
    <div>
        <h1 class="u:text-center">{$t("components.modal-role-creating.role-creating")}</h1>
    </div>
    <div>
        <TextField
            disabled={$qcCreateRole.loading}
            label={$t("components.modal-role-creating.name")}
            bind:value={name}
        />
    </div>
    <div>
        <div class="u:relative u:border u:border-default u:rounded">
            <div
                class="u:absolute u:left-3 u:top--1.8 u:px-0.5 u:bg-content u:text-default u:text-xs u:select-none u:pointer-events-none u:z-1"
            >
                {$t("components.modal-role-creating.permissions")}
            </div>
            <div class="u:flex u:flex-wrap u:gap-1 u:p-3">
                {#each selectedPermissions as permission (permission)}
                    <div class="u:flex u:items-center u:px-1 u:bg-info u:rounded">
                        <span>{permission}</span>
                        <button
                            class="u:flex u:ml-1 u:text-xs u:cursor-pointer"
                            disabled={$qcCreateRole.loading}
                            on:click={() => removePermission(permission)}
                        >
                            <i class="u:i-fa-solid-times" />
                        </button>
                    </div>
                {:else}
                    <div class="u:w-full u:text-center u:opacity-30">
                        ({$t("components.modal-role-creating.empty")})
                    </div>
                {/each}
            </div>
        </div>
    </div>
    <div class="u:flex u:gap-1">
        <div class="u:flex-1">
            <DropdownMenu
                disabled={items.length === 0 || $qcCreateRole.loading}
                {items}
                label={$t("components.modal-role-creating.permission")}
                bind:value={currentPermission}
            />
        </div>
        <div>
            <Button
                disabled={!currentPermission || $qcCreateRole.loading}
                variant="success"
                on:click={addPermission}
            >
                {$t("components.modal-role-creating.add")}
            </Button>
        </div>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcCreateRole.loading} text variant="error" on:click={close}>
            {$t("components.modal-role-creating.cancel")}
        </Button>
        <Button
            disabled={!vldResultName.valid}
            loading={$qcCreateRole.loading}
            variant="success"
            on:click={qcCreateRole.refresh}
        >
            {$t("components.modal-role-creating.create")}
        </Button>
    </div>
</Modal>
