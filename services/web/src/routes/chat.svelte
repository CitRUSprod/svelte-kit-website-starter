<script lang="ts">
    import { default as createScrollbar } from "overlayscrollbars"
    import { onMount, onDestroy, tick } from "svelte"
    import { browser } from "$app/env"
    import socket from "$lib/socket"

    import type OverlayScrollbar from "overlayscrollbars"

    interface Message {
        text: string
    }

    let messages: Array<Message> = []
    let messagesWrapper: HTMLElement
    let scrollbar: OverlayScrollbar | undefined

    onMount(() => {
        if (browser) {
            socket.emit("globalChat.join").on("globalChat.receive", (msg: Message) => {
                messages.push(msg)
                messages = messages
            })

            scrollbar = createScrollbar(messagesWrapper, {
                scrollbars: {
                    autoHide: "move"
                }
            })
        }
    })

    onDestroy(() => {
        scrollbar?.destroy()
        socket.off("globalChat.receive").emit("globalChat.leave")
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
            socket.emit("globalChat.send", {
                text: messageText
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
            <div class="h-full w-full overflow-y-auto absolute" bind:this={messagesWrapper}>
                <div class="h-full w-full">
                    {#each messages as message}
                        <div class="py-1 break-text">
                            <b>Anonymous:</b>
                            <span>{message.text}</span>
                        </div>
                    {:else}
                        <div class="flex flex-col h-full justify-center">
                            <h1 class="text-center text-default text-2xl">No messages</h1>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
        <div class="pt-4">
            <input
                class="input input-bordered w-full"
                placeholder="Message"
                bind:value={messageText}
                on:keypress={onEnter}
            />
        </div>
    </div>
</div>
