<script lang="ts">
    import { Content, Button, TextField } from "$lib/components"

    import { onDestroy } from "svelte"
    import { useQuery } from "@sveltestack/svelte-query"
    import { invalidateAll } from "$app/navigation"
    import { localePath } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    let email = "admin@example.com"
    let password = "12345678"

    $: vldResultEmail = vld.user.email(email)
    $: vldResultPassword = vld.user.password(password)

    $: completedForm = vldResultEmail.valid && vldResultPassword.valid

    const queryLogin = useQuery("auth.login", {
        async queryFn() {
            const res = await api.auth.login({
                email: vldResultEmail.value,
                password: vldResultPassword.value
            })
            return res.data
        },
        async onSuccess() {
            toasts.add("success", "You have successfully logged in")
            await invalidateAll()
        },
        onError(err: any) {
            if (err.response) {
                toasts.add("error", err.response.data.message)
            } else {
                toasts.add("error", "An error has occurred")
            }
        }
    })

    async function onEnter(e: KeyboardEvent) {
        if (e.key === "Enter" && completedForm) {
            await $queryLogin.refetch()
            const input = e.target as HTMLInputElement
            input.focus()
        }
    }

    onDestroy(() => {
        $queryLogin.remove()
    })
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

<Content.Center class="u:p-8">
    <div
        class="u:flex u:flex-col u:gap-4 u:w-full u:sm:w-100 u:p-8 u:border-primary u:rounded-lg u:border u:text-center"
    >
        <div>
            <h1>Login</h1>
        </div>
        <div>
            <TextField
                autofocus
                disabled={$queryLogin.isLoading}
                label="Email"
                bind:value={email}
                on:keypress={onEnter}
            />
        </div>
        <div>
            <TextField
                disabled={$queryLogin.isLoading}
                label="Password"
                valueType="password"
                bind:value={password}
                on:keypress={onEnter}
            />
        </div>
        <div>
            <a class="u:hover:underline" href={$localePath("/auth/reset")}>Forgot password?</a>
        </div>
        <div class="u:flex u:justify-between">
            <Button href={$localePath("/auth/registration")} text>Registration</Button>
            <Button
                disabled={!completedForm}
                loading={$queryLogin.isLoading}
                type="primary"
                on:click={() => $queryLogin.refetch()}
            >
                Login
            </Button>
        </div>
    </div>
</Content.Center>
