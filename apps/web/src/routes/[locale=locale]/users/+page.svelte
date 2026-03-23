<script lang="ts">
    import * as constantsEnums from "@repo/constants/enums"
    import * as schemasRoutes from "@repo/schemas/routes"
    import { dt } from "@repo/utils"
    import { untrack } from "svelte"

    import { DialogRoleAssigning, DialogUserBanning } from "./_components"

    import { ll, localePath, currentLocale } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { ContentDefault, Button, Pagination } from "$lib/components"
    import { useQueryParams, useQuery } from "$lib/hooks"
    import { toasts, user } from "$lib/stores"

    const { data } = $props()

    const paramSchemas = schemasRoutes.users.$getUsersQuery().shape

    const queryParams = useQueryParams({
        page: paramSchemas.page,
        perPage: paramSchemas.perPage
    })

    let dialogRoleAssigning = $state<DialogRoleAssigning>()
    let dialogUserBanning = $state<DialogUserBanning>()

    const qGetUsers = useQuery({
        initialData: untrack(() => data.itemsPage),
        minResponseTime: 500,
        fn() {
            return api.users.getUsers({
                page: queryParams.page,
                perPage: queryParams.perPage
            })
        }
    })

    let unbanUserId = $state(0)

    const qUnbanUser = useQuery({
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
        await qUnbanUser.refetch()
        await qGetUsers.refetch()
    }

    async function setPage(localPage: number) {
        queryParams.page = localPage
        await qGetUsers.refetch()
    }
</script>

<svelte:head>
    <title>{$ll.users()}</title>
</svelte:head>

<ContentDefault title={$ll.users()}>
    {#if qGetUsers.data}
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
                {#each qGetUsers.data.items as u (u.id)}
                    <tr
                        class="u:children:p-2 u:children:border u:children:border-default u:children:text-center u:children:hover:bg-zinc-100 u:dark:children:hover:bg-zinc-900 u:children:duration-200"
                    >
                        <td>{u.id}</td>
                        <td class="u:w-0">
                            <div class="u:w-20 u:h-20 u:overflow-hidden">
                                <img
                                    class="u:w-full u:h-full u:object-cover"
                                    alt={$ll.avatar()}
                                    src={u.avatar ?? "/img/no-avatar.png"}
                                />
                            </div>
                        </td>
                        <td>{u.username}</td>
                        <td>{u.email ?? "-"}</td>
                        <td>{u.role.name[$currentLocale]}</td>
                        <td>
                            {#if u.ban}
                                <div>{$ll.yes()}</div>
                                <div>{$ll.who()}: {u.ban.author.username}</div>
                                <div>{$ll.reason()}: {u.ban.reason}</div>
                            {:else}
                                <div>{$ll.no()}</div>
                            {/if}
                        </td>
                        <td>{dt.getFullDate(u.registrationDate, data.tz, $currentLocale)}</td>
                        <td>
                            <Button
                                href={$localePath(`/users/${String(u.id)}`)}
                                rel="noopener noreferrer"
                                target="_blank"
                                variant="info"
                            >
                                {$ll.open()}
                            </Button>
                            {#if user.data && user.data.id !== u.id && user.data.role.permissions.includes(constantsEnums.Permission.AssignRole)}
                                {#if !u.ban}
                                    <Button
                                        variant="warning"
                                        onClick={() => dialogRoleAssigning?.open(u)}
                                    >
                                        {$ll.assignRole()}
                                    </Button>
                                {/if}
                            {/if}
                            {#if user.data && user.data.id !== u.id && user.data.role.permissions.includes(constantsEnums.Permission.BanUser)}
                                {#if u.ban}
                                    <Button
                                        loading={qUnbanUser.loading && unbanUserId === u.id}
                                        variant="error"
                                        onClick={() => unbanUser(u.id)}
                                    >
                                        {$ll.unban()}
                                    </Button>
                                {:else}
                                    <Button
                                        variant="error"
                                        onClick={() => dialogUserBanning?.open(u)}
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
            <Pagination
                loading={qGetUsers.loading}
                page={qGetUsers.data.page}
                pages={qGetUsers.data.pages}
                onSetPage={page => setPage(page)}
            />
        </div>
    {/if}
</ContentDefault>

<DialogRoleAssigning
    bind:this={dialogRoleAssigning}
    roles={data.roles}
    onAssignRole={qGetUsers.refetch}
/>
<DialogUserBanning bind:this={dialogUserBanning} onBanUser={qGetUsers.refetch} />
