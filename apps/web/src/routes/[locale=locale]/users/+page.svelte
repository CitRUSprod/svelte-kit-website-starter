<script lang="ts">
    import * as constantsEnums from "@local/constants/enums"
    import * as schemasRoutes from "@local/schemas/routes"
    import { dt } from "@local/utils"

    import { DialogRoleAssigning, DialogUserBanning } from "./_components"

    import { ll, localePath, currentLocale } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Content, Button, SimplePagination } from "$lib/components"
    import { toasts, userData } from "$lib/stores"
    import { createQueryController, qp } from "$lib/utils"

    const { data } = $props()

    const paramSchemas = schemasRoutes.users.getUsersQuery().shape

    const queryParams = qp.createStore({
        page: qp.param(paramSchemas.page),
        perPage: qp.param(paramSchemas.perPage)
    })

    let dialogRoleAssigning = $state<DialogRoleAssigning>()
    let dialogUserBanning = $state<DialogUserBanning>()

    const qcGetUsers = createQueryController({
        initialData: data.itemsPage,
        fn() {
            return api.users.getUsers({
                page: $queryParams.page,
                perPage: $queryParams.perPage
            })
        }
    })

    let unbanUserId = $state(0)

    const qcUnbanUser = createQueryController({
        fn() {
            return api.users.unbanUser({
                id: unbanUserId
            })
        },
        onSuccess() {
            toasts.add("success", $ll.userUnbannedSuccessfully())
        }
    })

    async function unbanUser(id: number) {
        unbanUserId = id
        await qcUnbanUser.refresh()
        await qcGetUsers.refresh()
    }

    async function setPage(localPage: number) {
        $queryParams.page = localPage
        await qcGetUsers.refresh()
    }
</script>

<svelte:head>
    <title>{$ll.users()}</title>
</svelte:head>

<Content.Default title={$ll.users()}>
    {#if $qcGetUsers.data}
        <table>
            <thead>
                <tr
                    class="u:children:p-2 u:children:border u:children:border-default u:children:bg-zinc-200 u:dark:children:bg-zinc-700"
                >
                    <th>ID</th>
                    <th>{$ll.avatar()}</th>
                    <th>{$ll.username()}</th>
                    <th>{$ll.email()}</th>
                    <th>{$ll.role()}</th>
                    <th>{$ll.banned()}</th>
                    <th>{$ll.registrationDate()}</th>
                    <th>{$ll.actions()}</th>
                </tr>
            </thead>
            <tbody>
                {#each $qcGetUsers.data.items as user (user.id)}
                    <tr
                        class="u:children:p-2 u:children:border u:children:border-default u:children:text-center u:children:hover:bg-zinc-100 u:dark:children:hover:bg-zinc-900 u:children:duration-200"
                    >
                        <td>{user.id}</td>
                        <td class="u:w-0">
                            <div class="u:w-20 u:h-20 u:overflow-hidden">
                                <img
                                    class="u:w-full u:h-full u:object-cover"
                                    alt={$ll.avatar()}
                                    src={user.avatar ?? "/img/no-avatar.png"}
                                />
                            </div>
                        </td>
                        <td>{user.username}</td>
                        <td>{user.email ?? "-"}</td>
                        <td>{user.role.name[$currentLocale]}</td>
                        <td>
                            {#if user.ban}
                                <div>{$ll.yes()}</div>
                                <div>{$ll.who()}: {user.ban.author.username}</div>
                                <div>{$ll.reason()}: {user.ban.reason}</div>
                            {:else}
                                <div>{$ll.no()}</div>
                            {/if}
                        </td>
                        <td>{dt.getFullDate(user.registrationDate, data.tz, $currentLocale)}</td>
                        <td>
                            <Button
                                href={$localePath(`/users/${String(user.id)}`)}
                                rel="noopener noreferrer"
                                target="_blank"
                                variant="info"
                            >
                                {$ll.open()}
                            </Button>
                            {#if $userData && $userData.id !== user.id && $userData.role.permissions.includes(constantsEnums.Permission.AssignRole)}
                                {#if !user.ban}
                                    <Button
                                        variant="warning"
                                        onclick={() => dialogRoleAssigning?.open(user)}
                                    >
                                        {$ll.assignRole()}
                                    </Button>
                                {/if}
                            {/if}
                            {#if $userData && $userData.id !== user.id && $userData.role.permissions.includes(constantsEnums.Permission.BanUser)}
                                {#if user.ban}
                                    <Button
                                        loading={$qcUnbanUser.loading && unbanUserId === user.id}
                                        variant="error"
                                        onclick={() => unbanUser(user.id)}
                                    >
                                        {$ll.unban()}
                                    </Button>
                                {:else}
                                    <Button
                                        variant="error"
                                        onclick={() => dialogUserBanning?.open(user)}
                                    >
                                        {$ll.ban()}
                                    </Button>
                                {/if}
                            {/if}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
        <div class="u:flex u:justify-center">
            <SimplePagination
                loading={$qcGetUsers.loading}
                page={$qcGetUsers.data.page}
                pages={$qcGetUsers.data.pages}
                onSetPage={page => setPage(page)}
            />
        </div>
    {/if}
</Content.Default>

<DialogRoleAssigning
    bind:this={dialogRoleAssigning}
    roles={data.roles}
    onAssignRole={qcGetUsers.refresh}
/>
<DialogUserBanning bind:this={dialogUserBanning} onBanUser={qcGetUsers.refresh} />
