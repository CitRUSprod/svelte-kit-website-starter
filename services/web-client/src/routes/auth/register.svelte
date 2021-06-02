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
    import { register } from "$lib/utils/auth"
    import { messages } from "$lib/stores"

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

    async function onRegister() {
        loading = true

        try {
            await register(trimmedEmail, trimmedUsername, trimmedPassword)
            messages.add("success", "You have successfully registered")
            goto("/auth/login")
        } catch (err: any) {
            messages.add("error", err.data.message ?? err.message)
        }

        loading = false
    }

    async function onEnter(e: KeyboardEvent) {
        if (e.key === "Enter" && !disabled) {
            await onRegister()
            const input = e.target as HTMLInputElement
            input.focus()
        }
    }
</script>

<svelte:head>
    <title>Register</title>
</svelte:head>

<div class="flex h-full justify-center items-center">
    <div class="border-primary rounded-lg border-2 text-center p-8 w-80">
        <h1 class="text-4xl">Register</h1>
        <div class="mt-4">
            <input
                class="input input-bordered w-full"
                placeholder="Email"
                disabled="{loading}"
                bind:value="{email}"
                on:keypress="{onEnter}"
            />
        </div>
        <div class="mt-2">
            <input
                class="input input-bordered w-full"
                placeholder="Username"
                disabled="{loading}"
                bind:value="{username}"
                on:keypress="{onEnter}"
            />
        </div>
        <div class="mt-2">
            <input
                class="input input-bordered w-full"
                placeholder="Password"
                type="password"
                disabled="{loading}"
                bind:value="{password}"
                on:keypress="{onEnter}"
            />
        </div>
        <div class="mt-2">
            <input
                class="input input-bordered w-full"
                placeholder="Password Confirmation"
                type="password"
                disabled="{loading}"
                bind:value="{passwordConfirmation}"
                on:keypress="{onEnter}"
            />
        </div>
        <div class="flex mt-4 justify-between">
            <Button class="btn-ghost" href="/auth/login">Login</Button>
            <Button
                class="btn-primary"
                loading="{loading}"
                disabled="{disabled}"
                on:click="{onRegister}"
            >
                Register
            </Button>
        </div>
    </div>
</div>
