<script lang="ts">
    import Button from "./Button.svelte"
    import TextField from "./TextField.svelte"

    import { tick } from "svelte"
    import { ll } from "$i18n/helpers"

    import type { ChatMessage } from "$lib/types"

    interface Props {
        messages?: Array<ChatMessage>
        hideControls?: boolean
        onSend?(text: string): void
    }

    const { messages = [], hideControls = false, onSend = undefined }: Props = $props()

    let message = $state("")

    const trimmedMessage = $derived(message.trim())

    let messageContainer: HTMLElement | undefined = $state()

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

    $effect(() => {
        if (messages.length > 0) {
            scrollDown()
        }
    })

    function send() {
        onSend?.(trimmedMessage)
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
            <TextField placeholder={$ll.message()} bind:value={message} onkeypress={onEnter} />
        </div>
        <div>
            <Button class="u:w-full" disabled={!trimmedMessage} onclick={send}>
                {$ll.send()}
            </Button>
        </div>
    {/if}
</div>
