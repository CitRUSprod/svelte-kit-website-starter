<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    import type { Session } from "$lib/types"

    export const load: Load<{ session: Session }> = ({ session }) => {
        if (session.user) {
            return {
                status: 302,
                redirect: "/"
            }
        }

        return {}
    }
</script>

<script lang="ts">
    import { Button } from "$lib/components"

    import { goto } from "$app/navigation"
    import { toasts } from "$lib/stores"
    import { axios } from "$lib/utils"

    let email = ""
    let username = ""
    let password = ""
    let passwordConfirmation = ""

    let loading = false

    $: trimmedEmail = email.trim()
    $: trimmedUsername = username.trim()
    $: trimmedPassword = password.trim()
    $: trimmedPasswordConfirmation = passwordConfirmation.trim()

    $: disabled =
        !trimmedEmail ||
        !trimmedUsername ||
        !trimmedPassword ||
        !trimmedPasswordConfirmation ||
        trimmedPassword !== trimmedPasswordConfirmation

    async function register() {
        loading = true

        try {
            await axios.post("/api/auth/registration", {
                email: trimmedEmail,
                username: trimmedUsername,
                password: trimmedPassword
            })
            toasts.add("success", "You have successfully registered")
            goto("/auth/login")
        } catch (err: any) {
            toasts.add("error", err.response?.data?.message ?? err.message)
        }

        loading = false
    }

    async function onEnter(e: KeyboardEvent) {
        if (e.key === "Enter" && !disabled) {
            await register()
            const input = e.target as HTMLInputElement
            input.focus()
        }
    }
</script>

<svelte:head>
    <title>Registration</title>
</svelte:head>

<div class="flex h-full justify-center items-center">
    <div class="border-primary rounded-lg border-2 text-center p-8 w-80">
        <h1 class="text-4xl">Registration</h1>
        <div class="mt-4">
            <input
                class="input input-bordered w-full"
                placeholder="Email"
                disabled={loading}
                bind:value={email}
                on:keypress={onEnter}
            />
        </div>
        <div class="mt-2">
            <input
                class="input input-bordered w-full"
                placeholder="Username"
                disabled={loading}
                bind:value={username}
                on:keypress={onEnter}
            />
        </div>
        <div class="mt-2">
            <input
                class="input input-bordered w-full"
                placeholder="Password"
                type="password"
                disabled={loading}
                bind:value={password}
                on:keypress={onEnter}
            />
        </div>
        <div class="mt-2">
            <input
                class="input input-bordered w-full"
                placeholder="Password Confirmation"
                type="password"
                disabled={loading}
                bind:value={passwordConfirmation}
                on:keypress={onEnter}
            />
        </div>
        <div class="flex mt-4 justify-between">
            <Button class="btn-ghost" href="/auth/login">Login</Button>
            <Button class="btn-primary" {loading} {disabled} on:click={register}>Register</Button>
        </div>
    </div>
</div>
