<script lang="ts">
    import { default as createScrollbar } from "overlayscrollbars"
    import { onMount, onDestroy, tick } from "svelte"
    import { browser } from "$app/env"
    import { session } from "$app/stores"
    import { WSClient, WSMessageType } from "$lib/utils/ws"

    import type OverlayScrollbar from "overlayscrollbars"
    import type { WSMessage } from "$lib/utils/ws"

    type ReceivedMessageData = WSMessage[WSMessageType.GChatReceivedMessage]["data"]

    let messages: Array<ReceivedMessageData> = []

    let messagesWrapper: HTMLElement

    let ws: WSClient | undefined
    let scrollbar: OverlayScrollbar | undefined

    const messageListener = (data: ReceivedMessageData) => {
        messages.push(data)
        messages = messages
    }

    onMount(() => {
        if (browser) {
            ws = new WSClient()
            ws.on("message", WSMessageType.GChatReceivedMessage, messageListener)

            scrollbar = createScrollbar(messagesWrapper, {
                scrollbars: {
                    autoHide: "move"
                }
            })
        }
    })

    onDestroy(() => {
        ws?.off().close()
        scrollbar?.destroy()
    })

    async function scrollDown() {
        const element = scrollbar!.getElements().viewport
        const height = element.clientHeight + element.scrollTop
        if (height === element.scrollHeight) {
            await tick()
            scrollbar!.scroll(element.scrollHeight, 200)
        }
    }

    $: if (messages.length > 0) {
        scrollDown()
    }

    let messageText = ""

    $: trimmedMessageText = messageText.trim()

    function sendMessage() {
        if (trimmedMessageText) {
            ws!.send({
                type: WSMessageType.GChatSentMessage,
                data: {
                    text: trimmedMessageText
                }
            })
            messageText = ""
        }
    }

    function onEnter(e: KeyboardEvent) {
        if (e.key === "Enter") {
            sendMessage()
        }
    }
</script>

<svelte:head>
    <title>Chat</title>
</svelte:head>

<div class="flex h-full justify-center">
    <div class="border-primary rounded-lg flex flex-col border-2 p-8 w-80">
        <div class="pb-4">
            <h1 class="text-center text-4xl">Global chat</h1>
        </div>
        <div class="flex-grow relative">
            <div class="h-full w-full overflow-y-auto absolute" bind:this="{messagesWrapper}">
                <div class="h-full w-full">
                    {#each messages as message}
                        <div class="py-1 break-text">
                            <b>{message.sender}:</b>
                            <span>{message.text}</span>
                        </div>
                    {:else}
                        <div class="flex flex-col h-full justify-center">
                            <h1 class="text-center text-default text-2xl"> No messages </h1>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
        {#if $session.user}
            <div class="pt-4">
                <input
                    class="input input-bordered w-full"
                    placeholder="Message"
                    bind:value="{messageText}"
                    on:keypress="{onEnter}"
                />
            </div>
        {/if}
    </div>
</div>
