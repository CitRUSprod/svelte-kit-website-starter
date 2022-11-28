<script lang="ts">
    import { Content, Button, TextField } from "$lib/components"

    import { onDestroy } from "svelte"
    import { useQuery } from "@sveltestack/svelte-query"
    import { goto } from "$app/navigation"
    import { localePath } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    let email = ""
    let username = ""
    let password = ""
    let passwordConfirmation = ""

    $: vldResultEmail = vld.user.email(email)
    $: vldResultUsername = vld.user.username(username)
    $: vldResultPassword = vld.user.password(password)
    $: vldResultPasswordConfirmation = vld.user.password(passwordConfirmation)

    $: completedForm =
        vldResultEmail.valid &&
        vldResultUsername.valid &&
        vldResultPassword.valid &&
        vldResultPassword.value === vldResultPasswordConfirmation.value

    const queryRegister = useQuery("auth.register", {
        async queryFn() {
            const res = await api.auth.register({
                email: vldResultEmail.value,
                username: vldResultUsername.value,
                password: vldResultPassword.value
            })
            return res.data
        },
        async onSuccess() {
            toasts.add("success", "You have successfully registered")
            await goto($localePath("/auth/login"))
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
            await $queryRegister.refetch()
            const input = e.target as HTMLInputElement
            input.focus()
        }
    }

    onDestroy(() => {
        $queryRegister.remove()
    })
</script>

<svelte:head>
    <title>Registration</title>
</svelte:head>

<Content.Center class="u:p-8">
    <div
        class="u:flex u:flex-col u:gap-4 u:w-full u:sm:w-100 u:p-8 u:border-primary u:rounded-lg u:border u:text-center"
    >
        <div>
            <h1>Registration</h1>
        </div>
        <div>
            <TextField
                autofocus
                disabled={$queryRegister.isFetching}
                label="Email"
                bind:value={email}
                on:keypress={onEnter}
            />
        </div>
        <div>
            <TextField
                disabled={$queryRegister.isFetching}
                label="Username"
                bind:value={username}
                on:keypress={onEnter}
            />
        </div>
        <div>
            <TextField
                disabled={$queryRegister.isFetching}
                label="Password"
                valueType="password"
                bind:value={password}
                on:keypress={onEnter}
            />
        </div>
        <div>
            <TextField
                disabled={$queryRegister.isFetching}
                label="Password confirmation"
                valueType="password"
                bind:value={passwordConfirmation}
                on:keypress={onEnter}
            />
        </div>
        <div class="u:flex u:justify-between">
            <Button href={$localePath("/auth/login")} text>Login</Button>
            <Button
                disabled={!completedForm}
                loading={$queryRegister.isFetching}
                type="primary"
                on:click={() => $queryRegister.refetch()}
            >
                Register
            </Button>
        </div>
    </div>
</Content.Center>
