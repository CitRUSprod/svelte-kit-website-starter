<script lang="ts">
    import createScrollbar from "overlayscrollbars"
    import { onMount, onDestroy, tick } from "svelte"
    import { session } from "$lib/stores"
    import { socket } from "$lib/utils"

    import type OverlayScrollbar from "overlayscrollbars"
    import type { RawChatMessage, ChatMessage } from "$lib/types"

    let messages: Array<ChatMessage> = []
    let messagesWrapper: HTMLElement
    let scrollbar: OverlayScrollbar | undefined

    onMount(() => {
        socket
            .emit("global-chat:join")
            .once("global-chat:get-history", (msgs: Array<ChatMessage>) => {
                messages = msgs
            })
            .on("global-chat:receive", (msg: ChatMessage) => {
                messages.push(msg)
                messages = messages
            })

        scrollbar = createScrollbar(messagesWrapper, {
            scrollbars: {
                autoHide: "move"
            }
        })
    })

    onDestroy(() => {
        scrollbar?.destroy()
        socket.off("global-chat:receive").emit("global-chat:leave")
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
            const msg: RawChatMessage = {
                text: trimmedMessageText
            }

            socket.emit("global-chat:send", msg)
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
            <div class="h-full w-full overflow-y-auto absolute" bind:this={messagesWrapper}>
                <div class="h-full w-full">
                    {#each messages as msg}
                        <div class="py-1 break-text">
                            <a
                                class="font-bold hover:underline"
                                href="/users/{msg.user.id}"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {msg.user.username}:
                            </a>
                            <span>{msg.text}</span>
                        </div>
                    {:else}
                        <div class="flex flex-col h-full justify-center">
                            <h1 class="text-center text-default text-2xl">No messages</h1>
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
                    bind:value={messageText}
                    on:keypress={onEnter}
                />
            </div>
        {/if}
    </div>
</div>
