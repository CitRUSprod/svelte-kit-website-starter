<script lang="ts">
    import { Content, Button, TextField } from "$lib/components"

    import { goto } from "$app/navigation"
    import { t, localePath } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
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

    const qcRegister = createQueryController({
        fn() {
            return api.auth.register({
                email: vldResultEmail.value,
                username: vldResultUsername.value,
                password: vldResultPassword.value
            })
        },
        async onSuccess() {
            toasts.add(
                "success",
                "Письмо с подтверждением было отправлено на ваш адрес электронной почты"
            )
            await goto($localePath("/"))
        }
    })

    async function onEnter(e: KeyboardEvent) {
        if (e.key === "Enter" && completedForm) {
            await qcRegister.refresh()
            const input = e.target as HTMLInputElement
            input.focus()
        }
    }
</script>

<svelte:head>
    <title>{$t("routes.auth.registration.registration")}</title>
</svelte:head>

<Content.Center class="u:p-8">
    <div
        class="u:flex u:flex-col u:gap-4 u:w-full u:sm:w-100 u:p-8 u:border-primary u:rounded-lg u:border u:text-center"
    >
        <div>
            <h1>{$t("routes.auth.registration.registration")}</h1>
        </div>
        <div>
            <TextField
                autofocus
                disabled={$qcRegister.loading}
                label={$t("routes.auth.registration.email")}
                bind:value={email}
                on:keypress={onEnter}
            />
        </div>
        <div>
            <TextField
                disabled={$qcRegister.loading}
                label={$t("routes.auth.registration.username")}
                bind:value={username}
                on:keypress={onEnter}
            />
        </div>
        <div>
            <TextField
                disabled={$qcRegister.loading}
                label={$t("routes.auth.registration.password")}
                type="password"
                bind:value={password}
                on:keypress={onEnter}
            />
        </div>
        <div>
            <TextField
                disabled={$qcRegister.loading}
                label={$t("routes.auth.registration.password-confirmation")}
                type="password"
                bind:value={passwordConfirmation}
                on:keypress={onEnter}
            />
        </div>
        <div class="u:flex u:justify-between">
            <Button href={$localePath("/auth/login")} text>
                {$t("routes.auth.registration.login")}
            </Button>
            <Button
                disabled={!completedForm}
                loading={$qcRegister.loading}
                variant="primary"
                on:click={qcRegister.refresh}
            >
                {$t("routes.auth.registration.register")}
            </Button>
        </div>
    </div>
</Content.Center>
