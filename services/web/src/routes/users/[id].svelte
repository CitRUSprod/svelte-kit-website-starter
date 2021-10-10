<script lang="ts" context="module">
    import { fetchy, vld, dt, getRoleName, createRedirectResponse } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"
    import type { Session, User } from "$lib/types"

    async function getUser(id: number, f?: typeof fetch) {
        const res = await fetchy.get(`/api/users/${id}`, { fetch: f })
        const data: User = await res.json()
        return data
    }

    export const load: Load<{ session: Session }> = async ({ session, page: p, fetch: f }) => {
        if (!session.user) {
            return createRedirectResponse("/")
        }

        try {
            const user = await getUser(parseInt(p.params.id), f)

            return {
                props: { user }
            }
        } catch {
            return createRedirectResponse("/")
        }
    }
</script>

<script lang="ts">
    import { Button, CommonModal } from "$lib/components"

    import * as yup from "yup"
    import { session, toasts } from "$lib/stores"

    export let user: User

    async function updateUser() {
        user = await getUser(user.id)
    }

    const modals = {
        userEditing: {
            visible: false,
            waiting: false,
            email: "",
            username: "",
            open(this: void) {
                modals.userEditing.email = user.email
                modals.userEditing.username = user.username
                modals.userEditing.visible = true
            },
            close(this: void) {
                modals.userEditing.visible = false
            },
            async save(this: void) {
                modals.userEditing.waiting = true

                try {
                    await fetchy.put(`/api/users/${user.id}`, {
                        json: {
                            email: modals.userEditing.email.trim().toLowerCase(),
                            username: modals.userEditing.username.trim()
                        }
                    })
                    await updateUser()
                    toasts.add("success", "User has been successfully edited")
                    modals.userEditing.visible = false
                } catch (err: any) {
                    toasts.add("error", err.response?.data?.message ?? err.message)
                }

                modals.userEditing.waiting = false
            }
        },
        passwordChanging: {
            visible: false,
            waiting: false,
            oldPassword: "",
            newPassword: "",
            newPasswordConfirmation: "",
            open(this: void) {
                modals.passwordChanging.oldPassword = ""
                modals.passwordChanging.newPassword = ""
                modals.passwordChanging.newPasswordConfirmation = ""
                modals.passwordChanging.visible = true
            },
            close(this: void) {
                modals.passwordChanging.visible = false
            },
            async change(this: void) {
                modals.passwordChanging.waiting = true

                try {
                    await fetchy.put("/api/auth/password", {
                        json: {
                            oldPassword: modals.passwordChanging.oldPassword.trim(),
                            newPassword: modals.passwordChanging.newPassword.trim()
                        }
                    })
                    toasts.add("success", "Password has been successfully changed")
                    modals.passwordChanging.visible = false
                } catch (err: any) {
                    toasts.add("error", err.response?.data?.message ?? err.message)
                }

                modals.passwordChanging.waiting = false
            }
        }
    }

    $: validators = {
        completedUserEditingModal:
            (!vld.isEqualTI(modals.userEditing.email, user.email) ||
                !vld.isEqualT(modals.userEditing.username, user.username)) &&
            yup
                .string()
                .trim()
                .lowercase()
                .max(64)
                .email()
                .required()
                .isValidSync(modals.userEditing.email) &&
            yup
                .string()
                .trim()
                .min(3)
                .max(32)
                .test(v => vld.isWordChars(v!))
                .required()
                .isValidSync(modals.userEditing.username),
        completedPasswordChangingModal:
            !vld.isEqualT(
                modals.passwordChanging.oldPassword,
                modals.passwordChanging.newPassword
            ) &&
            vld.isEqualT(
                modals.passwordChanging.newPassword,
                modals.passwordChanging.newPasswordConfirmation
            ) &&
            yup
                .string()
                .trim()
                .min(8)
                .required()
                .isValidSync(modals.passwordChanging.oldPassword) &&
            yup.string().trim().min(8).required().isValidSync(modals.passwordChanging.newPassword)
    }

    let emailSending = false

    async function verifyEmail() {
        emailSending = true

        try {
            await fetchy.post("/api/auth/verification")
            toasts.add("success", "A confirmation email was sent to your email address")
        } catch (err: any) {
            toasts.add("error", err.response?.data?.message ?? err.message)
        }

        emailSending = false
    }
</script>

<svelte:head>
    <title>User Profile</title>
</svelte:head>

<h1 class="text-4xl">User Profile</h1>
<div class="mt-4 space-y-1">
    <div><b>Username:</b> {user.username}</div>
    <div><b>Email:</b> {user.email}</div>
    <div><b>Role:</b> {getRoleName(user.role)}</div>
    <div><b>Verified:</b> {user.verified ? "Yes" : "No"}</div>
    <div>
        <b>Registration date:</b>
        {dt.getFullDate(user.registrationDate)}
    </div>
    {#if $session.user?.id === user.id}
        <div>
            <Button class="btn-warning" on:click={modals.userEditing.open}>Edit</Button>
            <Button class="btn-warning" on:click={modals.passwordChanging.open}>
                Change password
            </Button>
            {#if !user.verified}
                <Button class="btn-success" loading={emailSending} on:click={verifyEmail}>
                    Verify email
                </Button>
            {/if}
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
<CommonModal
    title="Password changing"
    persistent={modals.passwordChanging.waiting}
    bind:visible={modals.passwordChanging.visible}
>
    <div class="form-control">
        <div class="label">
            <span class="label-text">Old password:</span>
        </div>
        <input
            class="input input-bordered"
            type="password"
            disabled={modals.passwordChanging.waiting}
            bind:value={modals.passwordChanging.oldPassword}
        />
    </div>
    <div class="form-control">
        <div class="label">
            <span class="label-text">New password:</span>
        </div>
        <input
            class="input input-bordered"
            type="password"
            disabled={modals.passwordChanging.waiting}
            bind:value={modals.passwordChanging.newPassword}
        />
    </div>
    <div class="form-control">
        <div class="label">
            <span class="label-text">New password confirmation:</span>
        </div>
        <input
            class="input input-bordered"
            type="password"
            disabled={modals.passwordChanging.waiting}
            bind:value={modals.passwordChanging.newPasswordConfirmation}
        />
    </div>
    <svelte:fragment slot="actions">
        <Button
            class="btn-success btn-sm"
            loading={modals.passwordChanging.waiting}
            disabled={!validators.completedPasswordChangingModal}
            on:click={modals.passwordChanging.change}
        >
            Change
        </Button>
        <Button
            class="btn-error btn-sm"
            disabled={modals.passwordChanging.waiting}
            on:click={modals.passwordChanging.close}
        >
            Cancel
        </Button>
    </svelte:fragment>
</CommonModal>
