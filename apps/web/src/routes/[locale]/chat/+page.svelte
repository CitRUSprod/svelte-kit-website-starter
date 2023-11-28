<script lang="ts">
    import { Content, Chat } from "$lib/components"

    import { onMount, onDestroy } from "svelte"
    import { t } from "$lib/locales"
    import { userData } from "$lib/stores"
    import { socket } from "$lib/utils"

    import type { RawChatMessage, ChatMessage } from "$lib/types"

    let messages: Array<ChatMessage> = []

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
                messages = messages
            })
    })

    onDestroy(() => {
        socket.off("global-chat:receive").emit("global-chat:leave")
    })
</script>

<svelte:head>
    <title>{$t("routes.chat.chat")}</title>
</svelte:head>

<Content.Center class="u:p-8">
    <div
        class="u:flex u:flex-col u:gap-4 u:w-full u:sm:w-100 u:h-full u:p-8 u:border-primary u:rounded-lg u:border u:text-center"
    >
        <div>
            <h1>{$t("routes.chat.chat")}</h1>
        </div>
        <Chat hideControls={!$userData} {messages} on:send={e => sendMessage(e.detail)} />
    </div>
</Content.Center>
