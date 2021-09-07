<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"

    export const load: Load = ({ session }) => {
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
    import { session } from "$app/stores"
    import { Auth } from "$lib/services"
    import { toasts } from "$lib/stores"

    let email = ""
    let password = ""

    let loading = false

    $: trimmedEmail = email.trim()
    $: trimmedPassword = password.trim()

    $: disabled = !trimmedEmail || !trimmedPassword

    async function onLogin() {
        loading = true

        try {
            const { token } = await Auth.login(trimmedEmail, trimmedPassword)
            const user = await Auth.getUser(token)
            $session.user = user
            toasts.add("success", "You have successfully logged in")
            goto("/")
        } catch (err: any) {
            toasts.add("error", err.response?.data?.message ?? err.message)
        }

        loading = false
    }

    async function onEnter(e: KeyboardEvent) {
        if (e.key === "Enter" && !disabled) {
            await onLogin()
            const input = e.target as HTMLInputElement
            input.focus()
        }
    }
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

<div class="flex h-full justify-center items-center">
    <div class="border-primary rounded-lg border-2 text-center p-8 w-80">
        <h1 class="text-4xl">Login</h1>
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
                placeholder="Password"
                type="password"
                disabled={loading}
                bind:value={password}
                on:keypress={onEnter}
            />
        </div>
        <div class="flex mt-4 justify-between">
            <Button class="btn-ghost" href="/auth/registration">Register</Button>
            <Button class="btn-primary" {loading} {disabled} on:click={onLogin}>Login</Button>
        </div>
    </div>
</div>
