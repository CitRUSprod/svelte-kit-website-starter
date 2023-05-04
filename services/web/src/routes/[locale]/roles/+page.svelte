<script lang="ts">
    import { Content, Button } from "$lib/components"
    import { ModalRoleCreating, ModalRoleEditing, ModalRoleRemoving } from "./_components"

    import { userData } from "$lib/stores"
    import { Permission } from "$lib/enums"
    import { createQueryController } from "$lib/utils"
    import * as api from "$lib/api"

    export let data

    let modalRoleCreating: ModalRoleCreating
    let modalRoleEditing: ModalRoleEditing
    let modalRoleRemoving: ModalRoleRemoving

    const qcGetRoles = createQueryController({
        initialData: { items: data.roles },
        fn() {
            return api.roles.getRoles()
        }
    })
</script>

<svelte:head>
    <title>Роли</title>
</svelte:head>

<Content.Default title="Роли">
    {#if $qcGetRoles.data}
        <table>
            <thead>
                <tr
                    class="u:children:p-2 u:children:border u:children:border-default u:children:bg-zinc-200 u:dark:children:bg-zinc-700"
                >
                    <th>Название</th>
                    <th>Разрешения</th>
                    {#if $userData?.role.permissions.includes(Permission.CreateRole)}
                        <th>Действия</th>
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
                                <span class="u:opacity-30">(пусто)</span>
                            {/if}
                        </td>
                        {#if $userData?.role.permissions.includes(Permission.CreateRole)}
                            <td>
                                {#if !role.protected}
                                    <Button
                                        type="warning"
                                        on:click={() => modalRoleEditing.open(role)}
                                    >
                                        Изменить
                                    </Button>
                                    <Button
                                        type="error"
                                        on:click={() => modalRoleRemoving.open(role)}
                                    >
                                        Удалить
                                    </Button>
                                {/if}
                            </td>
                        {/if}
                    </tr>
                {/each}
            </tbody>
        </table>
        <div class="u:flex u:justify-center">
            <Button type="success" on:click={modalRoleCreating.open}>Создать роль</Button>
        </div>
    {/if}
</Content.Default>

<ModalRoleCreating
    bind:this={modalRoleCreating}
    permissions={data.permissions}
    on:createRole={qcGetRoles.refresh}
/>
<ModalRoleEditing
    bind:this={modalRoleEditing}
    permissions={data.permissions}
    on:editRole={qcGetRoles.refresh}
/>
<ModalRoleRemoving bind:this={modalRoleRemoving} on:removeRole={qcGetRoles.refresh} />
