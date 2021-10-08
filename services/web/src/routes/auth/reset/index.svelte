<script lang="ts" context="module">
    import { fetchy, vld, createRedirectResponse } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"
    import type { Session } from "$lib/types"

    export const load: Load<{ session: Session }> = ({ session }) => {
        if (session.user) {
            return createRedirectResponse("/")
        }

        return {}
    }
</script>

<script lang="ts">
    import { Button } from "$lib/components"

    import * as yup from "yup"
    import { goto } from "$app/navigation"
    import { toasts } from "$lib/stores"

    let email = ""

    let waiting = false

    $: validators = {
        completedPasswordResetForm: yup
            .string()
            .trim()
            .lowercase()
            .max(64)
            .test(v => vld.isEmail(v!))
            .required()
            .isValidSync(email)
    }

    async function sendResetLink() {
        waiting = true

        try {
            await fetchy.post("/api/auth/password", {
                json: {
                    email: email.trim().toLowerCase()
                }
            })
            toasts.add("success", "A reset link was sent to your email address")
            goto("/")
        } catch (err: any) {
            toasts.add("error", err.response?.data?.message ?? err.message)
        }

        waiting = false
    }

    async function onEnter(e: KeyboardEvent) {
        if (e.key === "Enter" && validators.completedPasswordResetForm) {
            await sendResetLink()
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
                placeholder="Email"
                disabled={waiting}
                bind:value={email}
                on:keypress={onEnter}
            />
        </div>
        <div class="mt-4">
            <Button
                class="btn-primary"
                loading={waiting}
                disabled={!validators.completedPasswordResetForm}
                on:click={sendResetLink}
            >
                Send reset link
            </Button>
        </div>
    </div>
</div>
