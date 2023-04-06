<script lang="ts">
    import { Button, Modal } from "$lib/components"

    import { onDestroy } from "svelte"
    import { useQuery } from "@sveltestack/svelte-query"
    import { toasts } from "$lib/stores"
    import * as api from "$lib/api"

    import type { User } from "$lib/types"

    export let user: User

    let visible = false

    export function open() {
        visible = true
    }

    export function close() {
        visible = false
    }

    const queryDeleteAvatar = useQuery("profile.deleteAvatar", {
        async queryFn() {
            const res = await api.profile.deleteAvatar()
            return res.data
        },
        async onSuccess() {
            user.avatar = null
            toasts.add("success", "Avatar successfully removed")
            close()
        },
        onError(err: any) {
            if (err.response) {
                toasts.add("error", err.response.data.message)
            } else {
                toasts.add("error", "An error has occurred")
            }
        }
    })

    onDestroy(() => {
        $queryDeleteAvatar.remove()
    })
</script>

<Modal
    class="u:flex u:flex-col u:gap-4 u:w-100"
    persistent={$queryDeleteAvatar.isFetching}
    bind:visible
>
    <div>
        <h1>Removing an avatar</h1>
    </div>
    <div>
        <p>Are you sure you want to remove your avatar?</p>
    </div>
    <div class="u:flex u:justify-between">
        <Button disabled={$queryDeleteAvatar.isFetching} text type="success" on:click={close}>
            Cancel
        </Button>
        <Button
            loading={$queryDeleteAvatar.isFetching}
            type="error"
            on:click={() => $queryDeleteAvatar.refetch()}
        >
            Remove
        </Button>
    </div>
</Modal>
