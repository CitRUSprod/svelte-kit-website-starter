<script lang="ts">
    import { Button, TextField, DropdownMenu, Dialog } from "$lib/components"

    import * as constantsEnums from "@local/constants/enums"
    import { ll } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    interface Props {
        permissions: Array<constantsEnums.Permission>
        onCreateRole?(): void
    }

    const { permissions, onCreateRole = undefined }: Props = $props()

    let dialog = $state<Dialog>()

    let name = $state("")
    let currentPermission: constantsEnums.Permission | null = $state(null)
    let selectedPermissions: Array<constantsEnums.Permission> = $state([])

    const vldResultName = $derived(vld.role.name(name))

    const items = $derived(
        permissions.filter(p => !selectedPermissions.includes(p)).map(p => ({ text: p, value: p }))
    )

    export function open() {
        name = ""
        currentPermission = null
        selectedPermissions = []

        dialog?.open()
    }

    export function close() {
        dialog?.close()
    }

    const qcCreateRole = createQueryController({
        fn() {
            return api.roles.createRole({
                name: vldResultName.value,
                permissions: selectedPermissions
            })
        },
        async onSuccess() {
            onCreateRole?.()
            toasts.add("success", $ll.roleCreatedSuccessfully())
            close()
        }
    })

    function addPermission() {
        if (currentPermission) {
            selectedPermissions.push(currentPermission)
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
    persistent={$qcCreateRole.loading}
>
    <div>
        <h1 class="u:text-center">{$ll.roleCreating()}</h1>
    </div>
    <div>
        <TextField disabled={$qcCreateRole.loading} label={$ll.name()} bind:value={name} />
    </div>
    <div>
        <div class="u:relative u:border u:border-default u:rounded">
            <div
                class="u:absolute u:left-3 u:top--1.8 u:px-0.5 u:bg-content u:text-default u:text-xs u:select-none u:pointer-events-none u:z-1"
            >
                {$ll.permissions()}
            </div>
            <div class="u:flex u:flex-wrap u:gap-1 u:p-3">
                {#each selectedPermissions as permission (permission)}
                    <div class="u:flex u:items-center u:px-1 u:bg-info u:rounded">
                        <span>{permission}</span>
                        <button
                            class="u:flex u:ml-1 u:text-xs u:cursor-pointer"
                            disabled={$qcCreateRole.loading}
                            aria-label="remove"
                            onclick={() => removePermission(permission)}
                        >
                            <i class="u:i-fa-solid-times"></i>
                        </button>
                    </div>
                {:else}
                    <div class="u:w-full u:text-center u:opacity-30">
                        ({$ll.empty()})
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
                label={$ll.permission()}
                bind:value={currentPermission}
            />
        </div>
        <div>
            <Button
                disabled={!currentPermission || $qcCreateRole.loading}
                variant="success"
                onclick={addPermission}
            >
                {$ll.add()}
            </Button>
        </div>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcCreateRole.loading} text variant="error" onclick={close}>
            {$ll.cancel()}
        </Button>
        <Button
            disabled={!vldResultName.valid}
            loading={$qcCreateRole.loading}
            variant="success"
            onclick={qcCreateRole.refresh}
        >
            {$ll.create()}
        </Button>
    </div>
</Dialog>
