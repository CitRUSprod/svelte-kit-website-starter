<script lang="ts">
    import Button from "./Button/Button.svelte"
    import TextField from "./TextField.svelte"

    import { tick, createEventDispatcher } from "svelte"
    import { ll } from "$i18n/helpers"

    import type { ChatMessage } from "$lib/types"

    export let messages: Array<ChatMessage> = []
    export let hideControls = false

    const dispatch = createEventDispatcher()

    let message = ""

    $: trimmedMessage = message.trim()

    let messageContainer: HTMLElement | undefined

    async function scrollDown() {
        if (messageContainer) {
            const { clientHeight, scrollTop, scrollHeight } = messageContainer

            if (clientHeight + scrollTop === scrollHeight) {
                await tick()
                const { scrollHeight: height } = messageContainer
                messageContainer.scroll({
                    top: height,
                    behavior: "smooth"
                })
            }
        }
    }

    $: if (messages.length > 0) scrollDown()

    function send() {
        dispatch("send", trimmedMessage)
        message = ""
    }

    function onEnter(e: KeyboardEvent) {
        if (e.key === "Enter" && trimmedMessage) {
            send()
        }
    }
</script>

<div class="u:flex u:flex-col u:gap-2 u:h-full u:text-left">
    <div class="u:relative u:flex-1">
        <div
            bind:this={messageContainer}
            class="u:absolute u:top-0 u:left-0 u:w-full u:h-full u:overflow-auto u:basic-scrollbar"
        >
            {#each messages as msg (msg.uuid)}
                <div>
                    <b>{msg.user.username}:</b>
                    <span>{msg.text}</span>
                </div>
            {/each}
        </div>
    </div>
    {#if !hideControls}
        <div>
            <TextField
                placeholder={$ll.$$chat.message()}
                bind:value={message}
                on:keypress={onEnter}
            />
        </div>
        <div>
            <Button class="u:w-full" disabled={!trimmedMessage} on:click={send}>
                {$ll.$$chat.send()}
            </Button>
        </div>
    {/if}
</div>
