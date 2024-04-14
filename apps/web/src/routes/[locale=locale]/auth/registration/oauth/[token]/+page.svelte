<script lang="ts">
    import { Content, Button, TextField } from "$lib/components"

    import { invalidateAll } from "$app/navigation"
    import { ll } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { socket, createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    export let data

    let username = ""

    $: vldResultUsername = vld.user.username(username)

    $: completedForm = vldResultUsername.valid

    const qcRegister = createQueryController({
        fn() {
            return api.auth.oAuthRegister({
                oAuthRegistrationToken: data.token,
                username: vldResultUsername.value
            })
        },
        async onSuccess() {
            socket.disconnect().connect()
            toasts.add("success", $ll.registeredSuccessfully())
            await invalidateAll()
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
                disabled={$qcRegister.loading}
                label={$ll.username()}
                bind:value={username}
                on:keypress={onEnter}
            />
        </div>
        <div class="u:flex">
            <Button
                class="u:w-full"
                disabled={!completedForm}
                loading={$qcRegister.loading}
                variant="primary"
                on:click={qcRegister.refresh}
            >
                {$ll.register()}
            </Button>
        </div>
    </div>
</Content.Center>
