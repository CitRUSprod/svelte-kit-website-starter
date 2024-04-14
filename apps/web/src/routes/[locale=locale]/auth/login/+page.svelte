<script lang="ts">
    import { Content, Button, TextField, OAuthProviderButton } from "$lib/components"

    import * as constantsEnums from "@local/constants/enums"
    import { invalidateAll } from "$app/navigation"
    import { ll, localePath } from "$i18n/helpers"
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
            toasts.add("success", $ll.loggedInSuccessfully())
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
                disabled={$qcLogin.loading}
                label={$ll.email()}
                bind:value={email}
                on:keypress={onEnter}
            />
        </div>
        <div>
            <TextField
                disabled={$qcLogin.loading}
                label={$ll.password()}
                type="password"
                bind:value={password}
                on:keypress={onEnter}
            />
        </div>
        <div>
            <a class="u:hover:underline" href={$localePath("/profile/password")}>
                {$ll.forgotPassword()}
            </a>
        </div>
        <div class="u:flex u:justify-between">
            <Button href={$localePath("/auth/registration")} text>
                {$ll.registration()}
            </Button>
            <Button
                disabled={!completedForm}
                loading={$qcLogin.loading}
                variant="primary"
                on:click={qcLogin.refresh}
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
