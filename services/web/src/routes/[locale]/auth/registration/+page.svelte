<script lang="ts">
    import { Content, Button, TextField } from "$lib/components"

    import { localePath } from "$lib/locales"

    let email = ""
    let username = ""
    let password = ""
    let passwordConfirmation = ""
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
            <TextField label="Email" bind:value={email} />
        </div>
        <div>
            <TextField label="Username" bind:value={username} />
        </div>
        <div>
            <TextField label="Password" valueType="password" bind:value={password} />
        </div>
        <div>
            <TextField
                label="Password confirmation"
                valueType="password"
                bind:value={passwordConfirmation}
            />
        </div>
        <div class="u:flex u:justify-between">
            <Button href={$localePath("/auth/login")} text>Login</Button>
            <Button type="primary">Register</Button>
        </div>
    </div>
</Content.Center>
