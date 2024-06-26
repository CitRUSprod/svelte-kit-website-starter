<script lang="ts">
    import { Content, Button } from "$lib/components"
    import { DialogRoleCreating, DialogRoleEditing, DialogRoleRemoving } from "./_components"

    import * as constantsEnums from "@local/constants/enums"
    import { ll } from "$i18n/helpers"
    import { userData } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as api from "$lib/api"

    export let data

    let dialogRoleCreating: DialogRoleCreating
    let dialogRoleEditing: DialogRoleEditing
    let dialogRoleRemoving: DialogRoleRemoving

    const qcGetRoles = createQueryController({
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
    {#if $qcGetRoles.data}
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
                {#each $qcGetRoles.data.items as role (role.id)}
                    <tr
                        class="u:children:p-2 u:children:border u:children:border-default u:children:text-center u:children:hover:bg-zinc-100 u:dark:children:hover:bg-zinc-900 u:children:duration-200"
                    >
                        <td>{role.name}</td>
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
                                        on:click={() => dialogRoleEditing.open(role)}
                                    >
                                        {$ll.edit()}
                                    </Button>
                                    <Button
                                        variant="error"
                                        on:click={() => dialogRoleRemoving.open(role)}
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
        <div class="u:flex u:justify-center">
            <Button variant="success" on:click={dialogRoleCreating.open}>
                {$ll.createRole()}
            </Button>
        </div>
    {/if}
</Content.Default>

<DialogRoleCreating
    bind:this={dialogRoleCreating}
    {permissions}
    on:createRole={qcGetRoles.refresh}
/>
<DialogRoleEditing bind:this={dialogRoleEditing} {permissions} on:editRole={qcGetRoles.refresh} />
<DialogRoleRemoving bind:this={dialogRoleRemoving} on:removeRole={qcGetRoles.refresh} />
