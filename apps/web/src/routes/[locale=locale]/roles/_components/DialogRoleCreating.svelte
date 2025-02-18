<script lang="ts">
    import * as constantsEnums from "@local/constants/enums"

    import type { Locale } from "$i18n/helpers"
    import { ll, locales } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Button, TextField, Select, Dialog } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"
    import * as vld from "$lib/validators"

    interface Props {
        permissions: Array<constantsEnums.Permission>
        onCreateRole?(): void
    }

    const { permissions, onCreateRole = undefined }: Props = $props()

    let dialog = $state<Dialog>()

    const name = $state<Record<Locale, string>>(
        locales.reduce<Record<string, string>>((acc, locale) => {
            acc[locale] = ""
            return acc
        }, {})
    )
    let currentPermission = $state<constantsEnums.Permission>()
    let selectedPermissions = $state<Array<constantsEnums.Permission>>([])

    const vldResultName = $derived(vld.role.name(name))

    const items = $derived(
        permissions.filter(p => !selectedPermissions.includes(p)).map(p => ({ text: p, value: p }))
    )

    export function open() {
        for (const locale of locales) {
            name[locale] = ""
        }

        currentPermission = undefined
        selectedPermissions = []

        dialog?.open()
    }

    export function close() {
        dialog?.close()
    }

    const qCreateRole = useQuery({
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
            currentPermission = undefined
        }
    }

    function removePermission(permission: constantsEnums.Permission) {
        selectedPermissions = selectedPermissions.filter(p => p !== permission)
    }
</script>

<Dialog
    bind:this={dialog}
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={qCreateRole.loading}
>
    <div>
        <h1 class="u:text-center">{$ll.roleCreating()}</h1>
    </div>
    <div class="u:flex u:flex-col u:gap-4">
        {#each locales as locale (locale)}
            <TextField
                disabled={qCreateRole.loading}
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
                            disabled={qCreateRole.loading}
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
            <Select
                disabled={items.length === 0 || qCreateRole.loading}
                {items}
                label={$ll.permission()}
                bind:value={currentPermission}
            />
        </div>
        <div>
            <Button
                disabled={!currentPermission || qCreateRole.loading}
                variant="success"
                onclick={addPermission}
            >
                {$ll.add()}
            </Button>
        </div>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={qCreateRole.loading} text variant="error" onclick={close}>
            {$ll.cancel()}
        </Button>
        <Button
            disabled={!vldResultName.valid}
            loading={qCreateRole.loading}
            variant="success"
            onclick={qCreateRole.refetch}
        >
            {$ll.create()}
        </Button>
    </div>
</Dialog>
