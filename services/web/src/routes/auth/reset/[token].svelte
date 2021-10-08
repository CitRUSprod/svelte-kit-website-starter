<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"

    export const load: Load = ({ page }) => ({
        props: {
            token: page.params.token
        }
    })
</script>

<script lang="ts">
    import { Button } from "$lib/components"

    import * as yup from "yup"
    import { goto } from "$app/navigation"
    import { toasts } from "$lib/stores"
    import { fetchy, vld } from "$lib/utils"

    export let token: string

    let newPassword = ""
    let newPasswordConfirmation = ""

    let waiting = false

    $: validators = {
        completedPasswordResetForm:
            vld.isEqualT(newPassword, newPasswordConfirmation) &&
            yup.string().trim().min(8).required().isValidSync(newPassword)
    }

    async function resetPassword() {
        waiting = true

        try {
            await fetchy.patch("/api/auth/password", {
                json: {
                    token,
                    password: newPassword.trim()
                }
            })
            toasts.add("success", "Password has been successfully reset")
            goto("/auth/login")
        } catch (err: any) {
            toasts.add("error", err.response?.data?.message ?? err.message)
        }

        waiting = false
    }

    async function onEnter(e: KeyboardEvent) {
        if (e.key === "Enter" && validators.completedPasswordResetForm) {
            await resetPassword()
            const input = e.target as HTMLInputElement
            input.focus()
        }
    }
</script>

<svelte:head>
    <title>Password reset</title>
</svelte:head>

<div class="flex h-full justify-center items-center">
    <div class="border-primary rounded-lg border-2 text-center p-8 w-80">
        <h1 class="text-4xl">Password reset</h1>
        <div class="mt-4">
            <input
                class="input input-bordered w-full"
                type="password"
                placeholder="New password"
                disabled={waiting}
                bind:value={newPassword}
                on:keypress={onEnter}
            />
        </div>
        <div class="mt-4">
            <input
                class="input input-bordered w-full"
                type="password"
                placeholder="New password confirmation"
                disabled={waiting}
                bind:value={newPasswordConfirmation}
                on:keypress={onEnter}
            />
        </div>
        <div class="mt-4">
            <Button
                class="btn-primary"
                loading={waiting}
                disabled={!validators.completedPasswordResetForm}
                on:click={resetPassword}
            >
                Reset
            </Button>
        </div>
    </div>
</div>
