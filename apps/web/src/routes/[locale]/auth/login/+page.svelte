<script lang="ts">
    import { Content, Button, TextField } from "$lib/components"

    import { invalidateAll } from "$app/navigation"
    import { t, localePath } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { socket, createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    let email = ""
    let password = ""

    $: vldResultEmail = vld.user.email(email)
    $: vldResultPassword = vld.user.password(password)

    $: completedForm = vldResultEmail.valid && vldResultPassword.valid

    const qcLogin = createQueryController({
        fn() {
            return api.auth.login({
                email: vldResultEmail.value,
                password: vldResultPassword.value
            })
        },
        async onSuccess() {
            socket.disconnect().connect()
            toasts.add("success", $t("routes.auth.login.logged-in-successfully"))
            await invalidateAll()
        }
    })

    async function onEnter(e: KeyboardEvent) {
        if (e.key === "Enter" && completedForm) {
            await qcLogin.refresh()
            const input = e.target as HTMLInputElement
            input.focus()
        }
    }
</script>

<svelte:head>
    <title>{$t("routes.auth.login.login")}</title>
</svelte:head>

<Content.Center class="u:p-8">
    <div
        class="u:flex u:flex-col u:gap-4 u:w-full u:sm:w-100 u:p-8 u:border-primary u:rounded-lg u:border u:text-center"
    >
        <div>
            <h1>{$t("routes.auth.login.login")}</h1>
        </div>
        <div>
            <TextField
                autofocus
                disabled={$qcLogin.loading}
                label={$t("routes.auth.login.email")}
                bind:value={email}
                on:keypress={onEnter}
            />
        </div>
        <div>
            <TextField
                disabled={$qcLogin.loading}
                label={$t("routes.auth.login.password")}
                type="password"
                bind:value={password}
                on:keypress={onEnter}
            />
        </div>
        <div>
            <a class="u:hover:underline" href={$localePath("/profile/password")}>
                {$t("routes.auth.login.forgot-password")}
            </a>
        </div>
        <div class="u:flex u:justify-between">
            <Button href={$localePath("/auth/registration")} text>
                {$t("routes.auth.login.registration")}
            </Button>
            <Button href={$localePath("/auth/login/twitch")} text>Twitch</Button>
            <Button
                disabled={!completedForm}
                loading={$qcLogin.loading}
                variant="primary"
                on:click={qcLogin.refresh}
            >
                {$t("routes.auth.login.do-login")}
            </Button>
        </div>
    </div>
</Content.Center>
