<script lang="ts">
    import { Button, TextField, Dialog } from "$lib/components"

    import * as schemasModels from "@local/schemas/models"
    import { ll } from "$i18n/helpers"
    import { toasts } from "$lib/stores"
    import { createQueryController } from "$lib/utils"
    import * as vld from "$lib/validators"
    import * as api from "$lib/api"

    export let user: schemasModels.user.User

    let dialog: Dialog

    let username = ""

    $: vldResultUsername = vld.user.username(username)

    $: completedForm = vldResultUsername.valid && vldResultUsername.value !== user.username

    export function open() {
        username = user.username

        dialog.open()
    }

    export function close() {
        dialog.close()
    }

    const qcUpdateUser = createQueryController({
        fn() {
            return api.profile.updateUser({
                username: vldResultUsername.value
            })
        },
        onSuccess(localUser) {
            user = localUser
            toasts.add(
                "success",
                $ll.$.$users.$_id.$$dialogProfileEditing.profileEditedSuccessfully()
            )
            close()
        }
    })
</script>

<Dialog
    bind:this={dialog}
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={$qcUpdateUser.loading}
>
    <div>
        <h1 class="u:text-center">{$ll.$.$users.$_id.$$dialogProfileEditing.profileEditing()}</h1>
    </div>
    <div>
        <TextField
            disabled={$qcUpdateUser.loading}
            label={$ll.$.$users.$_id.$$dialogProfileEditing.username()}
            bind:value={username}
        />
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$qcUpdateUser.loading} text variant="error" on:click={close}>
            {$ll.$.$users.$_id.$$dialogProfileEditing.cancel()}
        </Button>
        <Button
            disabled={!completedForm}
            loading={$qcUpdateUser.loading}
            variant="success"
            on:click={qcUpdateUser.refresh}
        >
            {$ll.$.$users.$_id.$$dialogProfileEditing.save()}
        </Button>
    </div>
</Dialog>
