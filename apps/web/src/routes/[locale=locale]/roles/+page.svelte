<script lang="ts">
    import * as constantsEnums from "@repo/constants/enums"

    import { DialogRoleCreating, DialogRoleEditing, DialogRoleRemoving } from "./_components"

    import { ll, currentLocale } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Content, Button } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { userData } from "$lib/stores"

    const { data } = $props()

    let dialogRoleCreating = $state<DialogRoleCreating>()
    let dialogRoleEditing = $state<DialogRoleEditing>()
    let dialogRoleRemoving = $state<DialogRoleRemoving>()

    const qGetRoles = useQuery({
        initialData: { items: data.roles },
        fn() {
            return api.roles.getRoles()
        }
    })

    const permissions = Object.values(constantsEnums.Permission)
</script>

<svelte:head>
    <title>{$ll.roles()}</title>
</svelte:head>

<Content.Default title={$ll.roles()}>
    {#if qGetRoles.data}
        <table>
            <thead>
                <tr
                    class="u:children:p-2 u:children:border u:children:border-default u:children:bg-zinc-200 u:dark:children:bg-zinc-700"
                >
                    <th>{$ll.name()}</th>
                    <th>{$ll.permissions()}</th>
                    {#if $userData?.role.permissions.includes(constantsEnums.Permission.CreateRole)}
                        <th>{$ll.actions()}</th>
                    {/if}
                </tr>
            </thead>
            <tbody>
                {#each qGetRoles.data.items as role (role.id)}
                    <tr
                        class="u:children:p-2 u:children:border u:children:border-default u:children:text-center u:children:hover:bg-zinc-100 u:dark:children:hover:bg-zinc-900 u:children:duration-200"
                    >
                        <td>{role.name[$currentLocale]}</td>
                        <td>
                            {#if role.permissions.length > 0}
                                {role.permissions.join(", ")}
                            {:else}
                                <span class="u:opacity-30">({$ll.empty()})</span>
                            {/if}
                        </td>
                        {#if $userData?.role.permissions.includes(constantsEnums.Permission.CreateRole)}
                            <td>
                                {#if !role.protected}
                                    <Button
                                        variant="warning"
                                        onclick={() => dialogRoleEditing?.open(role)}
                                    >
                                        {$ll.edit()}
                                    </Button>
                                    <Button
                                        variant="error"
                                        onclick={() => dialogRoleRemoving?.open(role)}
                                    >
                                        {$ll.remove()}
                                    </Button>
                                {/if}
                            </td>
                        {/if}
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}
    <div class="u:flex u:justify-center">
        <Button variant="success" onclick={dialogRoleCreating?.open}>
            {$ll.createRole()}
        </Button>
    </div>
</Content.Default>

<DialogRoleCreating bind:this={dialogRoleCreating} {permissions} onCreateRole={qGetRoles.refetch} />
<DialogRoleEditing bind:this={dialogRoleEditing} {permissions} onEditRole={qGetRoles.refetch} />
<DialogRoleRemoving bind:this={dialogRoleRemoving} onRemoveRole={qGetRoles.refetch} />
