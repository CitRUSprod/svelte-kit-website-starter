<script lang="ts">
    import { invalidateAll } from "$app/navigation"
    import { ll } from "$i18n/helpers"
    import * as api from "$lib/api"
    import { Content, Button, TextField } from "$lib/components"
    import { useQuery } from "$lib/hooks"
    import { toasts } from "$lib/stores"
    import * as vld from "$lib/validators"

    const { data } = $props()

    let username = $state("")

    const vldResultUsername = $derived(vld.user.username(username))

    const completedForm = $derived(vldResultUsername.valid)

    const qRegister = useQuery({
        fn() {
            return api.auth.oAuthRegister({
                oAuthRegistrationToken: data.token,
                username: vldResultUsername.value
            })
        },
        async onSuccess() {
            toasts.add("success", $ll.registeredSuccessfully())
            await invalidateAll()
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
                disabled={qRegister.loading}
                label={$ll.username()}
                bind:value={username}
                onkeypress={onEnter}
            />
        </div>
        <div class="u:flex">
            <Button
                class="u:w-full"
                disabled={!completedForm}
                loading={qRegister.loading}
                variant="primary"
                onclick={qRegister.refetch}
            >
                {$ll.register()}
            </Button>
        </div>
    </div>
</Content.Center>
