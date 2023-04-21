<script lang="ts">
    import { Content, Button, Checkbox, SimplePagination } from "$lib/components"
    import { ModalRoleAssigning } from "./_components"

    import { t, localePath, currentLocale } from "$lib/locales"
    import { toasts, userData } from "$lib/stores"
    import { Permission } from "$lib/enums"
    import { createQueryController, qp, dt } from "$lib/utils"
    import * as api from "$lib/api"

    export let data

    let modalRoleAssigning: ModalRoleAssigning

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
                        perPage: params.perPage
                    },
                    data.defaultQuery
                )
            )
        }
    })

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
            toasts.add("success", $t("routes.users.user-banned-successfully"))
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
            toasts.add("success", $t("routes.users.user-unbanned-successfully"))
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
                    perPage: qcGetUsers.params.perPage
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
    <title>{$t("routes.users.users")}</title>
</svelte:head>

<Content.Default title={$t("routes.users.users")}>
    {#if $qcGetUsers.data}
        <table>
            <thead>
                <tr
                    class="u:children:p-2 u:children:border u:children:border-default u:children:bg-zinc-200 u:dark:children:bg-zinc-700"
                >
                    <th>ID</th>
                    <th>{$t("routes.users.avatar")}</th>
                    <th>{$t("routes.users.username")}</th>
                    {#if $userData?.role.permissions.includes(Permission.GetOtherUserEmail)}
                        <th>{$t("routes.users.email")}</th>
                        <th>{$t("routes.users.confirmed-email")}</th>
                    {/if}
                    <th>{$t("routes.users.role")}</th>
                    <th>{$t("routes.users.banned")}</th>
                    <th>{$t("routes.users.registration-date")}</th>
                    <th>{$t("routes.users.actions")}</th>
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
                                    alt={$t("routes.users.avatar")}
                                    src={user.avatar ?? "/img/no-avatar.png"}
                                />
                            </div>
                        </td>
                        <td>{user.username}</td>
                        {#if $userData?.role.permissions.includes(Permission.GetOtherUserEmail)}
                            <td>{user.email}</td>
                            <td>
                                <Checkbox checked={user.confirmedEmail} readonly />
                            </td>
                        {/if}
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
                                type="info"
                            >
                                {$t("routes.users.open")}
                            </Button>
                            {#if $userData?.role.permissions.includes(Permission.AssignRole)}
                                {#if !user.banned}
                                    <Button
                                        type="warning"
                                        on:click={() => modalRoleAssigning.open(user)}
                                    >
                                        {$t("routes.users.assign-role")}
                                    </Button>
                                {/if}
                            {/if}
                            {#if $userData?.role.permissions.includes(Permission.BanUser)}
                                {#if user.banned}
                                    <Button
                                        loading={$qcUnbanUser.loading &&
                                            qcUnbanUser.params.id === user.id}
                                        type="error"
                                        on:click={() => unbanUser(user.id)}
                                    >
                                        {$t("routes.users.unban")}
                                    </Button>
                                {:else}
                                    <Button
                                        loading={$qcBanUser.loading &&
                                            qcBanUser.params.id === user.id}
                                        type="error"
                                        on:click={() => banUser(user.id)}
                                    >
                                        {$t("routes.users.ban")}
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

<ModalRoleAssigning bind:this={modalRoleAssigning} roles={data.roles} on:assignRole={refetchPage} />
