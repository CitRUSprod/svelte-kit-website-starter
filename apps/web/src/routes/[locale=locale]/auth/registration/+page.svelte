<script lang="ts">
    import { Content, Button, TextField, OAuthProviderButton } from "$lib/components"

    import * as constantsEnums from "@local/constants/enums"
    import { goto } from "$app/navigation"
    import { ll, localePath } from "$i18n/helpers"
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
            toasts.add("success", $ll.confirmationEmailSent())
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
                disabled={$qcRegister.loading}
                label={$ll.email()}
                bind:value={email}
                on:keypress={onEnter}
            />
        </div>
        <div>
            <TextField
                disabled={$qcRegister.loading}
                label={$ll.username()}
                bind:value={username}
                on:keypress={onEnter}
            />
        </div>
        <div>
            <TextField
                disabled={$qcRegister.loading}
                label={$ll.password()}
                type="password"
                bind:value={password}
                on:keypress={onEnter}
            />
        </div>
        <div>
            <TextField
                disabled={$qcRegister.loading}
                label={$ll.passwordConfirmation()}
                type="password"
                bind:value={passwordConfirmation}
                on:keypress={onEnter}
            />
        </div>
        <div class="u:flex u:justify-between">
            <Button href={$localePath("/auth/login")} text>
                {$ll.login()}
            </Button>
            <Button
                disabled={!completedForm}
                loading={$qcRegister.loading}
                variant="primary"
                on:click={qcRegister.refresh}
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
