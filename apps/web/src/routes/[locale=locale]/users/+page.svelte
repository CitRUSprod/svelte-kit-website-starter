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

    const defaultQueryParams = schemasRoutes.users.getUsersQuery().parse({})

    const queryParams = qp.createStore({
        page: qp.number(defaultQueryParams.page),
        perPage: qp.number(defaultQueryParams.perPage)
    })

    let dialogRoleAssigning = $state<DialogRoleAssigning>()
    let dialogUserBanning = $state<DialogUserBanning>()

    const initialGetUsersParams = $state({
        page: $queryParams.page,
        perPage: $queryParams.perPage
    })

    const qcGetUsers = createQueryController({
        initialData: data.itemsPage,
        params: initialGetUsersParams,
        fn(params) {
            return api.users.getUsers({
                page: params.page,
                perPage: params.perPage
            })
        }
    })

    const initialUnbanUserParams = $state({
        id: 0
    })

    const qcUnbanUser = createQueryController({
        params: initialUnbanUserParams,
        fn(params) {
            return api.users.unbanUser({
                id: params.id
            })
        },
        onSuccess() {
            toasts.add("success", $ll.userUnbannedSuccessfully())
        }
    })

    async function unbanUser(id: number) {
        qcUnbanUser.params.id = id
        await qcUnbanUser.refresh()
        await qcGetUsers.refresh()
    }

    async function refetchPage() {
        $queryParams.page = qcGetUsers.params.page
        $queryParams.perPage = qcGetUsers.params.perPage

        await qcGetUsers.refresh()
    }

    async function setPage(localPage: number) {
        qcGetUsers.params.page = localPage
        await refetchPage()
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
                                        loading={$qcUnbanUser.loading &&
                                            qcUnbanUser.params.id === user.id}
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
    onAssignRole={refetchPage}
/>
<DialogUserBanning bind:this={dialogUserBanning} onBanUser={refetchPage} />
