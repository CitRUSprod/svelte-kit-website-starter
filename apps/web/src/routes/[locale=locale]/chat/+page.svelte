<script lang="ts">
    import { onMount, onDestroy } from "svelte"

    import { ll } from "$i18n/helpers"
    import { Content, Chat } from "$lib/components"
    import { userData } from "$lib/stores"
    import type { RawChatMessage, ChatMessage } from "$lib/types"
    import { socket } from "$lib/utils"

    let messages = $state<Array<ChatMessage>>([])

    function sendMessage(text: string) {
        const msg: RawChatMessage = { text }
        socket.emit("global-chat:send", msg)
    }

    onMount(() => {
        socket
            .emit("global-chat:join")
            .once("global-chat:get-history", (msgs: Array<ChatMessage>) => {
                messages = msgs
            })
            .on("global-chat:receive", (msg: ChatMessage) => {
                if (messages.length === 100) {
                    messages.shift()
                }

                messages.push(msg)
            })
    })

    onDestroy(() => {
        socket.off("global-chat:receive").emit("global-chat:leave")
    })
</script>

<svelte:head>
    <title>{$ll.chat()}</title>
</svelte:head>

<Content.Center class="u:p-8">
    <div
        class="u:flex u:flex-col u:gap-4 u:w-full u:sm:w-100 u:h-full u:p-8 u:border-primary u:rounded-lg u:border u:text-center"
    >
        <div>
            <h1>{$ll.chat()}</h1>
        </div>
        <Chat hideControls={!$userData} {messages} onSend={text => sendMessage(text)} />
    </div>
</Content.Center>
