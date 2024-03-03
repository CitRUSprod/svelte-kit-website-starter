<script lang="ts">
    import { Content, Button, Checkbox, SimplePagination } from "$lib/components"
    import { DialogRoleAssigning } from "./_components"

    import * as constantsEnums from "@local/constants/enums"
    import { ll, localePath, currentLocale } from "$i18n/helpers"
    import { toasts, userData } from "$lib/stores"
    import { createQueryController, qp, dt } from "$lib/utils"
    import * as api from "$lib/api"

    export let data

    let dialogRoleAssigning: DialogRoleAssigning

    const qcGetUsers = createQueryController({
        initialData: data.itemsPage,
        params: {
            page: data.query.page,
            perPage: data.query.perPage
        },
        fn(params) {
            return api.users.getUsers(
                qp.removeDefault(
                    {
                        page: params.page,
                        perPage: params.perPage,
                        sort: "registrationDate",
                        order: "asc"
                    },
                    data.defaultQuery
                )
            )
        }
    })

    function watchForData(d: typeof data) {
        qcGetUsers.params.page = d.query.page
        qcGetUsers.params.perPage = d.query.perPage
        $qcGetUsers.data = d.itemsPage
    }

    $: watchForData(data)

    const qcBanUser = createQueryController({
        params: {
            id: 0
        },
        fn(params) {
            return api.users.banUser({
                id: params.id
            })
        },
        onSuccess() {
            toasts.add("success", $ll.$.$users.userBannedSuccessfully())
        }
    })

    async function banUser(id: number) {
        qcBanUser.params.id = id
        await qcBanUser.refresh()
        await qcGetUsers.refresh()
    }

    const qcUnbanUser = createQueryController({
        params: {
            id: 0
        },
        fn(params) {
            return api.users.unbanUser({
                id: params.id
            })
        },
        onSuccess() {
            toasts.add("success", $ll.$.$users.userUnbannedSuccessfully())
        }
    })

    async function unbanUser(id: number) {
        qcUnbanUser.params.id = id
        await qcUnbanUser.refresh()
        await qcGetUsers.refresh()
    }

    async function refetchPage() {
        qp.setForCurrentPage(
            qp.removeDefault(
                {
                    page: qcGetUsers.params.page,
                    perPage: qcGetUsers.params.perPage,
                    sort: "registrationDate",
                    order: "asc"
                },
                data.defaultQuery
            )
        )
        await qcGetUsers.refresh()
    }

    async function setPage(localPage: number) {
        qcGetUsers.params.page = localPage
        await refetchPage()
    }
</script>

<svelte:head>
    <title>{$ll.$.$users.users()}</title>
</svelte:head>

<Content.Default title={$ll.$.$users.users()}>
    {#if $qcGetUsers.data}
        <table>
            <thead>
                <tr
                    class="u:children:p-2 u:children:border u:children:border-default u:children:bg-zinc-200 u:dark:children:bg-zinc-700"
                >
                    <th>ID</th>
                    <th>{$ll.$.$users.avatar()}</th>
                    <th>{$ll.$.$users.username()}</th>
                    <th>{$ll.$.$users.email()}</th>
                    <th>{$ll.$.$users.role()}</th>
                    <th>{$ll.$.$users.banned()}</th>
                    <th>{$ll.$.$users.registrationDate()}</th>
                    <th>{$ll.$.$users.actions()}</th>
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
                                    alt={$ll.$.$users.avatar()}
                                    src={user.avatar ?? "/img/no-avatar.png"}
                                />
                            </div>
                        </td>
                        <td>{user.username}</td>
                        <td>{user.email ?? "-"}</td>
                        <td>{user.role.name}</td>
                        <td>
                            <Checkbox checked={user.banned} readonly />
                        </td>
                        <td>{dt.getFullDate(user.registrationDate, $currentLocale)}</td>
                        <td>
                            <Button
                                href={$localePath(`/users/${String(user.id)}`)}
                                rel="noopener noreferrer"
                                target="_blank"
                                variant="info"
                            >
                                {$ll.$.$users.open()}
                            </Button>
                            {#if $userData?.role.permissions.includes(constantsEnums.Permission.AssignRole)}
                                {#if !user.banned}
                                    <Button
                                        variant="warning"
                                        on:click={() => dialogRoleAssigning.open(user)}
                                    >
                                        {$ll.$.$users.assignRole()}
                                    </Button>
                                {/if}
                            {/if}
                            {#if $userData?.role.permissions.includes(constantsEnums.Permission.BanUser)}
                                {#if user.banned}
                                    <Button
                                        loading={$qcUnbanUser.loading &&
                                            qcUnbanUser.params.id === user.id}
                                        variant="error"
                                        on:click={() => unbanUser(user.id)}
                                    >
                                        {$ll.$.$users.unban()}
                                    </Button>
                                {:else}
                                    <Button
                                        loading={$qcBanUser.loading &&
                                            qcBanUser.params.id === user.id}
                                        variant="error"
                                        on:click={() => banUser(user.id)}
                                    >
                                        {$ll.$.$users.ban()}
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
                on:setPage={e => setPage(e.detail)}
            />
        </div>
    {/if}
</Content.Default>

<DialogRoleAssigning
    bind:this={dialogRoleAssigning}
    roles={data.roles}
    on:assignRole={refetchPage}
/>
