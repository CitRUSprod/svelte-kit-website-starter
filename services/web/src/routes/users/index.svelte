<script lang="ts" context="module">
    import { browser } from "$app/env"
    import { Role } from "$lib/enums"
    import { axios, qp, hasAccess, getRoleName } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"
    import type { Session, User, ItemsPage } from "$lib/types"

    interface QueryParams {
        perPage: number
        page: number
        sort: string
        order: string
        email: string
        username: string
    }

    const defaultQuery: QueryParams = {
        perPage: 10,
        page: 1,
        sort: "registrationDate",
        order: "asc",
        email: "",
        username: ""
    }

    async function getUsersPage(query: QueryParams) {
        const { data } = await axios.get<ItemsPage<User>>("/api/users", {
            params: qp.removeDefault(query, defaultQuery)
        })
        return data
    }

    export const load: Load<{ session: Session }> = async ({ session, page: p }) => {
        if (!hasAccess(session.user, Role.Admin)) {
            return {
                status: 302,
                redirect: "/"
            }
        }

        if (browser) {
            const query = qp.get(
                p.query,
                defaultQuery,
                ["sort", "order", "email", "username"],
                ["perPage", "page"]
            )
            const page = await getUsersPage(query)

            return {
                props: {
                    asyncData: { page, query }
                }
            }
        } else {
            return {}
        }
    }
</script>

<script lang="ts">
    import FaIcon from "svelte-fa"
    import { Button, CommonModal, CommonPagination } from "$lib/components"

    import * as _ from "lodash-es"
    import { DateTime } from "luxon"
    import { faSearch, faPencilAlt } from "@fortawesome/free-solid-svg-icons"
    import { toasts } from "$lib/stores"

    interface AsyncData {
        page: ItemsPage<User>
        query: QueryParams
    }

    export let asyncData: AsyncData | null = null

    let itemsPerPage = defaultQuery.perPage

    const search = {
        email: defaultQuery.email,
        username: defaultQuery.username
    }

    let sorting = `${defaultQuery.sort}-${defaultQuery.order}`

    function watchForAsyncData(data: AsyncData | null) {
        if (data) {
            itemsPerPage = data.query.perPage
            search.email = data.query.email
            search.username = data.query.username
            sorting = `${data.query.sort}-${data.query.order}`
        }
    }

    $: watchForAsyncData(asyncData)

    async function updateUsersPage() {
        asyncData!.page = await getUsersPage(asyncData!.query)
        qp.setForCurrentPage(qp.removeDefault(asyncData!.query, defaultQuery))
    }

    async function onChangeItemsPerPage() {
        asyncData!.query.perPage = itemsPerPage
        asyncData!.query.page = 1
        await updateUsersPage()
    }

    async function onInputEmail() {
        asyncData!.query.email = search.email.trim().toLowerCase()
        await updateUsersPage()
    }

    async function onInputUsername() {
        asyncData!.query.username = search.username.trim()
        await updateUsersPage()
    }

    async function onChangeSorting() {
        const arr = sorting.split("-")
        asyncData!.query.sort = arr[0]
        asyncData!.query.order = arr[1]
        await updateUsersPage()
    }

    const modals = {
        userEditing: {
            visible: false,
            waiting: false,
            user: null as User | null,
            role: Role.User,
            open(user: User) {
                modals.userEditing.user = user
                modals.userEditing.role = user.role
                modals.userEditing.visible = true
            },
            close(this: void) {
                modals.userEditing.visible = false
            },
            async save(this: void) {
                modals.userEditing.waiting = true

                try {
                    const { id } = modals.userEditing.user!
                    await axios.put<User>(`/api/users/${id}`, {
                        role: modals.userEditing.role
                    })
                    await updateUsersPage()
                    toasts.add("success", "User has been successfully edited")
                    modals.userEditing.visible = false
                } catch (err: any) {
                    toasts.add("error", err.response?.data?.message ?? err.message)
                }

                modals.userEditing.waiting = false
            }
        }
    }

    $: validators = {
        completedUserEditingModal:
            !!modals.userEditing.user && modals.userEditing.role !== modals.userEditing.user.role
    }
</script>

<svelte:head>
    <title>Users</title>
</svelte:head>

{#if asyncData}
    <h1 class="text-4xl">Users</h1>
    <div class="flex mt-4 space-x-2">
        <div class="relative w-full">
            <input
                class="input input-primary w-full pr-12"
                placeholder="Username"
                bind:value={search.username}
                on:input={_.debounce(onInputUsername, 500)}
            />
            <div class="absolute top-0 right-0 p-4 pointer-events-none">
                <FaIcon icon={faSearch} />
            </div>
        </div>
        <div class="relative w-full">
            <input
                class="input input-primary w-full pr-12"
                placeholder="Email"
                bind:value={search.email}
                on:input={_.debounce(onInputEmail, 500)}
            />
            <div class="absolute top-0 right-0 p-4 pointer-events-none">
                <FaIcon icon={faSearch} />
            </div>
        </div>
        <select class="select select-primary" bind:value={sorting} on:change={onChangeSorting}>
            <option value="registrationDate-asc">Registration date (Earliest)</option>
            <option value="registrationDate-desc">Registration date (Latest)</option>
            <option value="username-asc">Username (A-Z)</option>
            <option value="username-desc">Username (Z-A)</option>
        </select>
    </div>
    <div class="mt-4 overflow-x-auto">
        <table class="table w-full">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Registration date</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {#each asyncData.page.items as user (user.id)}
                    <tr>
                        <th>{user.id}</th>
                        <td>
                            <a class="hover:underline" href="/users/{user.id}">{user.username}</a>
                        </td>
                        <td>{user.email}</td>
                        <td>{getRoleName(user.role)}</td>
                        <td>{DateTime.fromISO(user.registrationDate).toFormat("LLLL d, yyyy")}</td>
                        <td class="text-right">
                            <Button on:click={() => modals.userEditing.open(user)}>
                                <FaIcon icon={faPencilAlt} />
                            </Button>
                        </td>
                    </tr>
                {:else}
                    <tr>
                        <td class="text-center" colspan="6">Empty</td>
                    </tr>
                {/each}
            </tbody>
        </table>
        {#if asyncData.page.items.length}
            <CommonPagination
                currentPage={asyncData.page.pageNumber}
                pageCount={asyncData.page.pageCount}
                pathname="/users"
                query={asyncData.query}
                bind:itemsPerPage
                on:changeItemsPerPage={onChangeItemsPerPage}
            />
        {/if}
    </div>
    <CommonModal
        title="User editing"
        persistent={modals.userEditing.waiting}
        bind:visible={modals.userEditing.visible}
    >
        <div class="form-control">
            <div class="label">
                <span class="label-text">Username:</span>
            </div>
            <input
                class="input input-bordered"
                readonly
                value={modals.userEditing.user?.username}
            />
        </div>
        <div class="form-control">
            <div class="label">
                <span class="label-text">Email:</span>
            </div>
            <input class="input input-bordered" readonly value={modals.userEditing.user?.email} />
        </div>
        <div class="form-control">
            <div class="label">
                <span class="label-text">Role:</span>
            </div>
            <select
                class="select select-bordered w-full"
                disabled={modals.userEditing.waiting}
                bind:value={modals.userEditing.role}
            >
                {#each Object.values(Role) as role (role)}
                    <option value={role}>{getRoleName(role)}</option>
                {/each}
            </select>
        </div>
        <svelte:fragment slot="actions">
            <Button
                class="btn-success btn-sm"
                loading={modals.userEditing.waiting}
                disabled={!validators.completedUserEditingModal}
                on:click={modals.userEditing.save}
            >
                Save
            </Button>
            <Button
                class="btn-error btn-sm"
                disabled={modals.userEditing.waiting}
                on:click={modals.userEditing.close}
            >
                Cancel
            </Button>
        </svelte:fragment>
    </CommonModal>
{/if}
