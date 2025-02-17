<script lang="ts">
    import * as constantsEnums from "@local/constants/enums"

    import { invalidateAll } from "$app/navigation"
    import { ll, localePath } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Content, Button, TextField, OAuthProviderButton } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"
    import { socket } from "$lib/utils"
    import * as vld from "$lib/validators"

    let email = $state("")
    let password = $state("")

    const vldResultEmail = $derived(vld.user.email(email))
    const vldResultPassword = $derived(vld.user.password(password))

    const completedForm = $derived(vldResultEmail.valid && vldResultPassword.valid)

    const qLogin = useQuery({
        fn() {
            return api.auth.login({
                email: vldResultEmail.value,
                password: vldResultPassword.value
            })
        },
        async onSuccess() {
            toasts.add("success", $ll.loggedInSuccessfully())
            socket.disconnect().connect()
            await invalidateAll()
        }
    })

    async function onEnter(e: KeyboardEvent) {
        if (e.key === "Enter" && completedForm) {
            await qLogin.refetch()
            const input = e.target as HTMLInputElement
            input.focus()
        }
    }
</script>

<svelte:head>
    <title>{$ll.login()}</title>
</svelte:head>

<Content.Center class="u:p-8">
    <div
        class="u:flex u:flex-col u:gap-4 u:w-full u:sm:w-100 u:p-8 u:border-primary u:rounded-lg u:border u:text-center"
    >
        <div>
            <h1>{$ll.login()}</h1>
        </div>
        <div>
            <TextField
                autofocus
                disabled={qLogin.loading}
                label={$ll.email()}
                bind:value={email}
                onkeypress={onEnter}
                data-testid="email-input"
            />
        </div>
        <div>
            <TextField
                disabled={qLogin.loading}
                label={$ll.password()}
                type="password"
                bind:value={password}
                onkeypress={onEnter}
                data-testid="password-input"
            />
        </div>
        <div>
            <a
                class="u:hover:underline"
                href={$localePath("/profile/password")}
                data-testid="forgot-password-link"
            >
                {$ll.forgotPassword()}
            </a>
        </div>
        <div class="u:flex u:justify-between">
            <Button href={$localePath("/auth/registration")} text data-testid="registration-button">
                {$ll.registration()}
            </Button>
            <Button
                disabled={!completedForm}
                loading={qLogin.loading}
                variant="primary"
                onclick={qLogin.refetch}
                data-testid="login-button"
            >
                {$ll.doLogin()}
            </Button>
        </div>
        <div>
            <h3>{$ll.orLoginWith()}</h3>
        </div>
        <div class="u:flex u:justify-center u:gap-2 u:flex-wrap">
            <OAuthProviderButton provider={constantsEnums.OAuthProvider.Twitch} />
        </div>
    </div>
</Content.Center>
