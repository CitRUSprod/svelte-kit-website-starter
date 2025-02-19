<script lang="ts">
    import * as constantsEnums from "@repo/constants/enums"

    import { goto } from "$app/navigation"
    import { ll, localePath } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Content, Button, TextField, OAuthProviderButton } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"
    import * as vld from "$lib/validators"

    let email = $state("")
    let username = $state("")
    let password = $state("")
    let passwordConfirmation = $state("")

    const vldResultEmail = $derived(vld.user.email(email))
    const vldResultUsername = $derived(vld.user.username(username))
    const vldResultPassword = $derived(vld.user.password(password))
    const vldResultPasswordConfirmation = $derived(vld.user.password(passwordConfirmation))

    const completedForm = $derived(
        vldResultEmail.valid &&
            vldResultUsername.valid &&
            vldResultPassword.valid &&
            vldResultPassword.value === vldResultPasswordConfirmation.value
    )

    const qRegister = useQuery({
        fn() {
            return api.auth.register({
                email: vldResultEmail.value,
                username: vldResultUsername.value,
                password: vldResultPassword.value
            })
        },
        async onSuccess() {
            toasts.add("success", $ll.confirmationEmailSent())
            await goto($localePath("/"))
        }
    })

    async function onEnter(e: KeyboardEvent) {
        if (e.key === "Enter" && completedForm) {
            await qRegister.refetch()
            const input = e.target as HTMLInputElement
            input.focus()
        }
    }
</script>

<svelte:head>
    <title>{$ll.registration()}</title>
</svelte:head>

<Content.Center class="u:p-8">
    <div
        class="u:flex u:flex-col u:gap-4 u:w-full u:sm:w-100 u:p-8 u:border-primary u:rounded-lg u:border u:text-center"
    >
        <div>
            <h1>{$ll.registration()}</h1>
        </div>
        <div>
            <TextField
                autofocus
                disabled={qRegister.loading}
                label={$ll.email()}
                bind:value={email}
                onkeypress={onEnter}
                data-testid="email-input"
            />
        </div>
        <div>
            <TextField
                disabled={qRegister.loading}
                label={$ll.username()}
                bind:value={username}
                onkeypress={onEnter}
                data-testid="username-input"
            />
        </div>
        <div>
            <TextField
                disabled={qRegister.loading}
                label={$ll.password()}
                type="password"
                bind:value={password}
                onkeypress={onEnter}
                data-testid="password-input"
            />
        </div>
        <div>
            <TextField
                disabled={qRegister.loading}
                label={$ll.passwordConfirmation()}
                type="password"
                bind:value={passwordConfirmation}
                onkeypress={onEnter}
                data-testid="password-confirmation-input"
            />
        </div>
        <div class="u:flex u:justify-between">
            <Button href={$localePath("/auth/login")} text data-testid="login-button">
                {$ll.login()}
            </Button>
            <Button
                disabled={!completedForm}
                loading={qRegister.loading}
                variant="primary"
                onclick={qRegister.refetch}
                data-testid="register-button"
            >
                {$ll.register()}
            </Button>
        </div>
        <div>
            <h3>{$ll.orRegisterWith()}</h3>
        </div>
        <div class="u:flex u:justify-center u:gap-2 u:flex-wrap">
            <OAuthProviderButton provider={constantsEnums.OAuthProvider.Twitch} />
        </div>
    </div>
</Content.Center>
