<script lang="ts">
    import { Content, Button, TextField } from "$lib/components"

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
            toasts.add("success", $ll.$.$auth.$login.loggedInSuccessfully())
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
    <title>{$ll.$.$auth.$login.login()}</title>
</svelte:head>

<Content.Center class="u:p-8">
    <div
        class="u:flex u:flex-col u:gap-4 u:w-full u:sm:w-100 u:p-8 u:border-primary u:rounded-lg u:border u:text-center"
    >
        <div>
            <h1>{$ll.$.$auth.$login.login()}</h1>
        </div>
        <div>
            <TextField
                autofocus
                disabled={$qcLogin.loading}
                label={$ll.$.$auth.$login.email()}
                bind:value={email}
                on:keypress={onEnter}
            />
        </div>
        <div>
            <TextField
                disabled={$qcLogin.loading}
                label={$ll.$.$auth.$login.password()}
                type="password"
                bind:value={password}
                on:keypress={onEnter}
            />
        </div>
        <div>
            <a class="u:hover:underline" href={$localePath("/profile/password")}>
                {$ll.$.$auth.$login.forgotPassword()}
            </a>
        </div>
        <div class="u:flex u:justify-between">
            <Button href={$localePath("/auth/registration")} text>
                {$ll.$.$auth.$login.registration()}
            </Button>
            <Button
                disabled={!completedForm}
                loading={$qcLogin.loading}
                variant="primary"
                on:click={qcLogin.refresh}
            >
                {$ll.$.$auth.$login.doLogin()}
            </Button>
        </div>
        <div>
            <h3>{$ll.$.$auth.$login.orLoginWith()}</h3>
        </div>
        <div class="u:flex u:justify-center u:gap-2 u:flex-wrap">
            <Button
                class="u:bg-purple-800! u:hover:bg-purple-700! u:active:bg-purple-900!"
                href={$localePath("/auth/login/twitch")}
            >
                <i class="u:i-mdi-twitch u:text-xl u:mr-1" />
                <span>Twitch</span>
            </Button>
        </div>
    </div>
</Content.Center>
