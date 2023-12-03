<script lang="ts">
    import { Content, Button } from "$lib/components"
    import { DialogRoleCreating, DialogRoleEditing, DialogRoleRemoving } from "./_components"

    import { t } from "$lib/locales"
    import { userData } from "$lib/stores"
    import { Permission } from "$lib/enums"
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
</script>

<svelte:head>
    <title>{$t("routes.roles.roles")}</title>
</svelte:head>

<Content.Default title={$t("routes.roles.roles")}>
    {#if $qcGetRoles.data}
        <table>
            <thead>
                <tr
                    class="u:children:p-2 u:children:border u:children:border-default u:children:bg-zinc-200 u:dark:children:bg-zinc-700"
                >
                    <th>{$t("routes.roles.name")}</th>
                    <th>{$t("routes.roles.permissions")}</th>
                    {#if $userData?.role.permissions.includes(Permission.CreateRole)}
                        <th>{$t("routes.roles.actions")}</th>
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
                                <span class="u:opacity-30">({$t("routes.roles.empty")})</span>
                            {/if}
                        </td>
                        {#if $userData?.role.permissions.includes(Permission.CreateRole)}
                            <td>
                                {#if !role.protected}
                                    <Button
                                        variant="warning"
                                        on:click={() => dialogRoleEditing.open(role)}
                                    >
                                        {$t("routes.roles.edit")}
                                    </Button>
                                    <Button
                                        variant="error"
                                        on:click={() => dialogRoleRemoving.open(role)}
                                    >
                                        {$t("routes.roles.remove")}
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
                {$t("routes.roles.create-role")}
            </Button>
        </div>
    {/if}
</Content.Default>

<DialogRoleCreating
    bind:this={dialogRoleCreating}
    permissions={data.permissions}
    on:createRole={qcGetRoles.refresh}
/>
<DialogRoleEditing
    bind:this={dialogRoleEditing}
    permissions={data.permissions}
    on:editRole={qcGetRoles.refresh}
/>
<DialogRoleRemoving bind:this={dialogRoleRemoving} on:removeRole={qcGetRoles.refresh} />
