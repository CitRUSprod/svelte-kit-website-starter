<script lang="ts">
    import * as constantsWs from "@repo/constants/ws"
    import * as schemasCommon from "@repo/schemas/common"
    import * as schemasWs from "@repo/schemas/ws"
    import { defineWsEmit, defineWsOn } from "@repo/utils"
    import { onMount, onDestroy } from "svelte"

    import { ll } from "$i18n/helpers"
    import { Content, Chat } from "$lib/components"
    import { userData } from "$lib/stores"
    import { socket } from "$lib/utils"

    const wsEvents = constantsWs.globalChat.client

    let messages = $state<Array<schemasCommon.chat.$Message>>([])

    function sendMessage(text: string) {
        socket.emit(
            wsEvents.emit.sendMessage,
            defineWsEmit<schemasWs.globalChat.$SendMessage>({ text })
        )
    }

    onMount(() => {
        socket
            .emit(wsEvents.emit.join)
            .once(
                wsEvents.on.receiveHistory,
                defineWsOn<schemasWs.globalChat.$ReceiveHistory>(msgs => {
                    messages = msgs
                })
            )
            .on(
                wsEvents.on.receiveMessage,
                defineWsOn<schemasWs.globalChat.$ReceiveMessage>(msg => {
                    if (messages.length === 100) {
                        messages.shift()
                    }

                    messages.push(msg)
                })
            )
    })

    onDestroy(() => {
        socket.off(wsEvents.on.receiveMessage).emit(wsEvents.emit.leave)
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
