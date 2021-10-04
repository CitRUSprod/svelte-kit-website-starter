<script lang="ts" context="module">
    import { ky, socket, vld, getRedirectLoadOutput } from "$lib/utils"

    import type { Load } from "@sveltejs/kit"
    import type { Session } from "$lib/types"

    export const load: Load<{ session: Session }> = ({ session }) => {
        if (session.user) {
            return getRedirectLoadOutput("/")
        }

        return {}
    }
</script>

<script lang="ts">
    import { Button } from "$lib/components"

    import * as yup from "yup"
    import { goto } from "$app/navigation"
    import { session, toasts } from "$lib/stores"

    let email = ""
    let password = ""

    let waiting = false

    $: validators = {
        completedLoginForm:
            yup
                .string()
                .trim()
                .lowercase()
                .max(64)
                .test(v => vld.isEmail(v!))
                .required()
                .isValidSync(email) && yup.string().trim().min(8).required().isValidSync(password)
    }

    async function login() {
        waiting = true

        try {
            await ky.post("api/auth/login", {
                json: {
                    email: email.trim().toLowerCase(),
                    password: password.trim()
                }
            })
            const res = await ky.get("api/auth/user")
            const data = await res.json()
            $session.user = data
            socket.disconnect().connect()
            toasts.add("success", "You have successfully logged in")
            goto("/")
        } catch (err: any) {
            toasts.add("error", err.response?.data?.message ?? err.message)
        }

        waiting = false
    }

    async function onEnter(e: KeyboardEvent) {
        if (e.key === "Enter" && validators.completedLoginForm) {
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
                disabled={waiting}
                bind:value={email}
                on:keypress={onEnter}
            />
        </div>
        <div class="mt-2">
            <input
                class="input input-bordered w-full"
                placeholder="Password"
                type="password"
                disabled={waiting}
                bind:value={password}
                on:keypress={onEnter}
            />
        </div>
        <div class="mt-2">
            <a class="hover:underline" href="/auth/reset">Forgot password?</a>
        </div>
        <div class="flex mt-4 justify-between">
            <Button class="btn-ghost" href="/auth/registration">Register</Button>
            <Button
                class="btn-primary"
                loading={waiting}
                disabled={!validators.completedLoginForm}
                on:click={login}
            >
                Login
            </Button>
        </div>
    </div>
</div>
