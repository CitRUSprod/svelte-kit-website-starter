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
    import { session, toasts } from "$lib/stores"
    import axios from "$lib/utils/axios"

    let email = ""
    let password = ""

    let loading = false

    $: trimmedEmail = email.trim()
    $: trimmedPassword = password.trim()

    $: disabled = !trimmedEmail || !trimmedPassword

    async function login() {
        loading = true

        try {
            await axios.post("/api/auth/login", {
                email: trimmedEmail,
                password: trimmedPassword
            })
            const { data } = await axios.get("/api/auth/user")
            $session.user = data
            toasts.add("success", "You have successfully logged in")
            goto("/")
        } catch (err: any) {
            toasts.add("error", err.response?.data?.message ?? err.message)
        }

        loading = false
    }

    async function onEnter(e: KeyboardEvent) {
        if (e.key === "Enter" && !disabled) {
            await login()
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
            <Button class="btn-primary" {loading} {disabled} on:click={login}>Login</Button>
        </div>
    </div>
</div>
