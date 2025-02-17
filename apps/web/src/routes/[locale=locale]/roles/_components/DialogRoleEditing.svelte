<script lang="ts">
    import * as constantsEnums from "@local/constants/enums"
    import * as schemasModels from "@local/schemas/models"

    import type { Locale } from "$i18n/helpers"
    import { ll, locales } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Button, TextField, DropdownMenu, Dialog } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"
    import * as vld from "$lib/validators"

    interface Props {
        permissions: Array<constantsEnums.Permission>
        onEditRole?(): void
    }

    const { permissions, onEditRole = undefined }: Props = $props()

    let dialog = $state<Dialog>()

    let roleId = 0
    const name = $state<Record<Locale, string>>(
        locales.reduce<Record<string, string>>((acc, locale) => {
            acc[locale] = ""
            return acc
        }, {})
    )
    let currentPermission: constantsEnums.Permission | null = $state(null)
    let selectedPermissions: Array<constantsEnums.Permission> = $state([])

    const vldResultName = $derived(vld.role.name(name))

    const items = $derived(
        permissions.filter(p => !selectedPermissions.includes(p)).map(p => ({ text: p, value: p }))
    )

    export function open(role: schemasModels.role.Role) {
        roleId = role.id

        for (const locale of locales) {
            name[locale] = role.name[locale]
        }

        currentPermission = null
        selectedPermissions = [...role.permissions]

        dialog?.open()
    }

    export function close() {
        dialog?.close()
    }

    const qUpdateRole = useQuery({
        fn() {
            return api.roles.updateRole({
                id: roleId,
                name: vldResultName.value,
                permissions: selectedPermissions
            })
        },
        async onSuccess() {
            onEditRole?.()
            toasts.add("success", $ll.roleEditedSuccessfully())
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
    persistent={qUpdateRole.loading}
>
    <div>
        <h1 class="u:text-center">{$ll.roleEditing()}</h1>
    </div>
    <div class="u:flex u:flex-col u:gap-4">
        {#each locales as locale (locale)}
            <TextField
                disabled={qUpdateRole.loading}
                label={`${$ll.name()} (${locale.toUpperCase()})`}
                bind:value={name[locale]}
            />
        {/each}
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
                            disabled={qUpdateRole.loading}
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
                disabled={items.length === 0 || qUpdateRole.loading}
                {items}
                label={$ll.permission()}
                bind:value={currentPermission}
            />
        </div>
        <div>
            <Button
                disabled={!currentPermission || qUpdateRole.loading}
                variant="success"
                onclick={addPermission}
            >
                {$ll.add()}
            </Button>
        </div>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={qUpdateRole.loading} text variant="error" onclick={close}>
            {$ll.cancel()}
        </Button>
        <Button
            disabled={!vldResultName.valid}
            loading={qUpdateRole.loading}
            variant="success"
            onclick={qUpdateRole.refetch}
        >
            {$ll.save()}
        </Button>
    </div>
</Dialog>
