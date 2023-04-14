<script lang="ts">
    import { Content, Button, TextField } from "$lib/components"

    import { onDestroy } from "svelte"
    import { useQuery } from "@sveltestack/svelte-query"
    import { invalidateAll } from "$app/navigation"
    import { t, localePath } from "$lib/locales"
    import { toasts } from "$lib/stores"
    import { socket } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    let email = ""
    let password = ""

    $: vldResultEmail = vld.user.email(email)
    $: vldResultPassword = vld.user.password(password)

    $: completedForm = vldResultEmail.valid && vldResultPassword.valid

    const queryLogin = useQuery("auth.login", {
        async queryFn() {
            const res = await api.auth.login({
                email: vldResultEmail.value,
                password: vldResultPassword.value
            })
            return res.data
        },
        async onSuccess() {
            socket.disconnect().connect()
            toasts.add("success", $t("routes.auth.login.logged-in-successfully"))
            await invalidateAll()
        },
        onError(err: any) {
            if (err.response) {
                toasts.add("error", err.response.data.message)
            } else {
                toasts.add("error", $t("global.error-occurred"))
            }
        }
    })

    async function onEnter(e: KeyboardEvent) {
        if (e.key === "Enter" && completedForm) {
            await $queryLogin.refetch()
            const input = e.target as HTMLInputElement
            input.focus()
        }
    }

    onDestroy(() => {
        $queryLogin.remove()
    })
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
                disabled={$queryLogin.isFetching}
                label={$t("routes.auth.login.email")}
                bind:value={email}
                on:keypress={onEnter}
            />
        </div>
        <div>
            <TextField
                disabled={$queryLogin.isFetching}
                label={$t("routes.auth.login.password")}
                valueType="password"
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
            <Button
                disabled={!completedForm}
                loading={$queryLogin.isFetching}
                type="primary"
                on:click={() => $queryLogin.refetch()}
            >
                {$t("routes.auth.login.do-login")}
            </Button>
        </div>
    </div>
</Content.Center>
