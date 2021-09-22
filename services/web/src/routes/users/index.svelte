<script lang="ts" context="module">
    import { browser } from "$app/env"
    import { Role } from "$lib/enums"
    import { axios, hasAccess, getRoleName } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"
    import type { Session, User } from "$lib/types"

    export const load: Load<{ session: Session }> = async ({ session }) => {
        if (!hasAccess(session.user, Role.Admin)) {
            return {
                status: 302,
                redirect: "/"
            }
        }

        if (browser) {
            const { data } = await axios.get<Array<User>>("/api/users")
            return { props: { users: data } }
        } else {
            return {}
        }
    }
</script>

<script lang="ts">
    import FaIcon from "svelte-fa"
    import { Button, Modal } from "$lib/components"

    import { DateTime } from "luxon"
    import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"
    import { toasts } from "$lib/stores"

    export let users: Array<User> = []

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
                    const { data } = await axios.put<User>(`/api/users/${id}`, {
                        role: modals.userEditing.role
                    })
                    modals.userEditing.user!.role = data.role
                    users = users
                    toasts.add("success", "User has been successfully edited")
                    modals.userEditing.visible = false
                } catch (err: any) {
                    toasts.add("error", err.response?.data?.message ?? err.message)
                }

                modals.userEditing.waiting = false
            }
        }
    }
</script>

<svelte:head>
    <title>Users</title>
</svelte:head>

<h1 class="text-4xl">Users</h1>
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
            {#each users as user (user.id)}
                <tr>
                    <th>{user.id}</th>
                    <td>
                        <a class="hover:underline" href="/users/{user.id}">{user.username}</a>
                    </td>
                    <td>{user.email}</td>
                    <td>{getRoleName(user.role)}</td>
                    <td>{DateTime.fromISO(user.createdAt).toFormat("LLLL d, yyyy")}</td>
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
</div>
<Modal
    class="space-y-2"
    persistent={modals.userEditing.waiting}
    bind:visible={modals.userEditing.visible}
>
    <h1 class="text-2xl">User editing</h1>
    <div class="form-control">
        <div class="label">
            <span class="label-text">Username:</span>
        </div>
        <input class="input input-bordered" readonly value={modals.userEditing.user?.username} />
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
    <div class="grid grid-cols-2 gap-2 !mt-6">
        <Button
            class="btn-success btn-sm"
            loading={modals.userEditing.waiting}
            disabled={modals.userEditing.role === modals.userEditing.user?.role}
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
    </div>
</Modal>
