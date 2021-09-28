<script lang="ts" context="module">
    import { browser } from "$app/env"
    import { goto } from "$app/navigation"
    import { axios, validators as vld, getRoleName } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"
    import type { Session, User } from "$lib/types"

    async function getUser(id: number) {
        const { data } = await axios.get<User>(`/api/users/${id}`)
        return data
    }

    export const load: Load<{ session: Session }> = async ({ session, page }) => {
        if (!session.user) {
            return {
                status: 302,
                redirect: "/"
            }
        }

        if (browser) {
            try {
                const user = await getUser(parseInt(page.params.id))

                return {
                    props: {
                        asyncData: { user }
                    }
                }
            } catch (err: unknown) {
                goto("/", { replaceState: true })
            }
        } else {
            return {}
        }
    }
</script>

<script lang="ts">
    import { Button, CommonModal } from "$lib/components"

    import * as yup from "yup"
    import { DateTime } from "luxon"
    import { session, toasts } from "$lib/stores"

    interface AsyncData {
        user: User
    }

    export let asyncData: AsyncData | null = null

    async function updateUser() {
        asyncData!.user = await getUser(asyncData!.user.id)
    }

    const modals = {
        userEditing: {
            visible: false,
            waiting: false,
            email: "",
            username: "",
            open(this: void) {
                modals.userEditing.email = asyncData!.user.email
                modals.userEditing.username = asyncData!.user.username
                modals.userEditing.visible = true
            },
            close(this: void) {
                modals.userEditing.visible = false
            },
            async save(this: void) {
                modals.userEditing.waiting = true

                try {
                    await axios.put<User>(`/api/users/${asyncData!.user.id}`, {
                        email: modals.userEditing.email.trim().toLowerCase(),
                        username: modals.userEditing.username.trim()
                    })
                    await updateUser()
                    toasts.add("success", "User has been successfully edited")
                    modals.userEditing.visible = false
                } catch (err: any) {
                    toasts.add("error", err.response?.data?.message ?? err.message)
                }

                modals.userEditing.waiting = false
            }
        }
    }

    $: rules = {
        completedUserEditingModal:
            !!asyncData &&
            (!vld.isEqualTI(modals.userEditing.email, asyncData.user.email) ||
                !vld.isEqualT(modals.userEditing.username, asyncData.user.username)) &&
            yup
                .string()
                .trim()
                .lowercase()
                .max(64)
                .test(v => vld.isEmail(v!))
                .required()
                .isValidSync(modals.userEditing.email) &&
            yup
                .string()
                .trim()
                .min(3)
                .max(32)
                .test(v => vld.isWordChars(v!))
                .required()
                .isValidSync(modals.userEditing.username)
    }
</script>

<svelte:head>
    <title>User Profile</title>
</svelte:head>

{#if asyncData}
    <h1 class="text-4xl">User Profile</h1>
    <div class="mt-4 space-y-1">
        <div><b>Username:</b> {asyncData.user.username}</div>
        <div><b>Email:</b> {asyncData.user.email}</div>
        <div><b>Role:</b> {getRoleName(asyncData.user.role)}</div>
        <div>
            <b>Registration date:</b>
            {DateTime.fromISO(asyncData.user.registrationDate).toFormat("LLLL d, yyyy")}
        </div>
        {#if $session.user?.id === asyncData.user.id}
            <div>
                <Button class="btn-warning" on:click={modals.userEditing.open}>Edit</Button>
            </div>
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
                disabled={modals.userEditing.waiting}
                bind:value={modals.userEditing.username}
            />
        </div>
        <div class="form-control">
            <div class="label">
                <span class="label-text">Email:</span>
            </div>
            <input
                class="input input-bordered"
                disabled={modals.userEditing.waiting}
                bind:value={modals.userEditing.email}
            />
        </div>
        <svelte:fragment slot="actions">
            <Button
                class="btn-success btn-sm"
                loading={modals.userEditing.waiting}
                disabled={!rules.completedUserEditingModal}
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
