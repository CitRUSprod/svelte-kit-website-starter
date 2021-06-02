<script lang="ts">
    import { Button } from "$lib/components"
    import FaIcon from "svelte-fa"

    import { fly, fade } from "svelte/transition"
    import {
        faTimes,
        faCheck,
        faTimesCircle,
        faExclamationTriangle,
        faInfoCircle
    } from "@fortawesome/free-solid-svg-icons"
    import { messages } from "$lib/stores"

    const { list } = messages

    function getIconByType(type: string) {
        switch (type) {
            case "success":
                return faCheck
            case "error":
                return faTimesCircle
            case "warning":
                return faExclamationTriangle
            default:
                return faInfoCircle
        }
    }
</script>

<div class="flex flex-col-reverse text-white right-4 bottom-3 w-80 absolute">
    {#each $list as message (message.id)}
        <div
            class="alert my-1 select-none {[
                'alert-success',
                'alert-error',
                'alert-warning',
                'alert-info'
            ].find(c => c.endsWith(message.type))}"
            in:fly="{{ y: -200, duration: 500 }}"
            out:fade
        >
            <FaIcon icon="{getIconByType(message.type)}" />
            <div class="msg-text flex-grow px-3">{message.text}</div>
            <Button
                class="btn-ghost btn-circle btn-sm"
                on:click="{() => {
                    messages.remove(message.id)
                }}"
            >
                <FaIcon icon="{faTimes}" />
            </Button>
        </div>
    {/each}
</div>

<style lang="postcss">
    .msg-text {
        word-break: break-word;
    }
</style>
