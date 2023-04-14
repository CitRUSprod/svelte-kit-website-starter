<script lang="ts">
    import { Content, Button, Checkbox, SimplePagination } from "$lib/components"
    import { ModalRoleAssigning } from "./_components"

    import { onDestroy } from "svelte"
    import { useQuery } from "@sveltestack/svelte-query"
    import { t, localePath } from "$lib/locales"
    import { toasts, userData } from "$lib/stores"
    import { Permission } from "$lib/enums"
    import { qp, dt } from "$lib/utils"
    import * as api from "$lib/api"

    import type { PageData } from "./$types"

    export let data: PageData

    let modalRoleAssigning: ModalRoleAssigning

    const params = {
        page: data.query.page,
        perPage: data.query.perPage
    }

    const queryGetUsers = useQuery("users.getUsers", {
        initialData: data.itemsPage,
        async queryFn() {
            const res = await api.users.getUsers(
                qp.removeDefault(
                    {
                        page: params.page,
                        perPage: params.perPage
                    },
                    data.defaultQuery
                )
            )
            return res.data
        },
        onError(err: any) {
            if (err.response) {
                toasts.add("error", err.response.data.message)
            } else {
                toasts.add("error", $t("global.error-occurred"))
            }
        }
    })

    const queryDataBanUser = {
        id: 0
    }

    const queryBanUser = useQuery("users.banUser", {
        async queryFn() {
            const res = await api.users.banUser({
                id: queryDataBanUser.id
            })
            return res.data
        },
        onSuccess() {
            toasts.add("success", $t("routes.users.user-banned-successfully"))
        },
        onError(err: any) {
            if (err.response) {
                toasts.add("error", err.response.data.message)
            } else {
                toasts.add("error", $t("global.error-occurred"))
            }
        }
    })

    async function banUser(id: number) {
        queryDataBanUser.id = id
        await $queryBanUser.refetch()
        await $queryGetUsers.refetch()
    }

    const queryDataUnbanUser = {
        id: 0
    }

    const queryUnbanUser = useQuery("users.unbanUser", {
        async queryFn() {
            const res = await api.users.unbanUser({
                id: queryDataUnbanUser.id
            })
            return res.data
        },
        onSuccess() {
            toasts.add("success", $t("routes.users.user-unbanned-successfully"))
        },
        onError(err: any) {
            if (err.response) {
                toasts.add("error", err.response.data.message)
            } else {
                toasts.add("error", $t("global.error-occurred"))
            }
        }
    })

    async function unbanUser(id: number) {
        queryDataUnbanUser.id = id
        await $queryUnbanUser.refetch()
        await $queryGetUsers.refetch()
    }

    async function refetchPage() {
        qp.setForCurrentPage(
            qp.removeDefault(
                {
                    page: params.page,
                    perPage: params.perPage
                },
                data.defaultQuery
            )
        )
        await $queryGetUsers.refetch()
    }

    async function setPage(localPage: number) {
        params.page = localPage
        await refetchPage()
    }

    onDestroy(() => {
        $queryGetUsers.remove()
    })
</script>

<svelte:head>
    <title>{$t("routes.users.users")}</title>
</svelte:head>

<Content.Default title={$t("routes.users.users")}>
    {#if $queryGetUsers.data}
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
                {#each $queryGetUsers.data.items as user (user.id)}
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
                        <td>{dt.getFullDate(user.registrationDate)}</td>
                        <td>
                            <Button
                                href={$localePath(`/users/${user.id}`)}
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
                                        loading={$queryUnbanUser.isFetching &&
                                            queryDataUnbanUser.id === user.id}
                                        type="error"
                                        on:click={() => unbanUser(user.id)}
                                    >
                                        {$t("routes.users.unban")}
                                    </Button>
                                {:else}
                                    <Button
                                        loading={$queryBanUser.isFetching &&
                                            queryDataBanUser.id === user.id}
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
                loading={$queryGetUsers.isFetching}
                page={$queryGetUsers.data.page}
                pages={$queryGetUsers.data.pages}
                on:setPage={e => setPage(e.detail)}
            />
        </div>
    {/if}
</Content.Default>

<ModalRoleAssigning bind:this={modalRoleAssigning} roles={data.roles} on:assignRole={refetchPage} />
