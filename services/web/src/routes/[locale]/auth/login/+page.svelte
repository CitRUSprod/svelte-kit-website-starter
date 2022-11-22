<script lang="ts">
    import { Content, Button, TextField } from "$lib/components"

    import { invalidateAll } from "$app/navigation"
    import { localePath } from "$lib/locales"
    import * as api from "$lib/api"

    let email = "admin@example.com"
    let password = "12345678"

    async function login() {
        await api.auth.login({
            email,
            password
        })

        await invalidateAll()
    }
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
            <TextField label="Email" bind:value={email} />
        </div>
        <div>
            <TextField label="Password" valueType="password" bind:value={password} />
        </div>
        <div>
            <a class="u:hover:underline" href={$localePath("/auth/reset")}>Forgot password?</a>
        </div>
        <div class="u:flex u:justify-between">
            <Button href={$localePath("/auth/registration")} text>Registration</Button>
            <Button type="primary" on:click={login}>Login</Button>
        </div>
    </div>
</Content.Center>
