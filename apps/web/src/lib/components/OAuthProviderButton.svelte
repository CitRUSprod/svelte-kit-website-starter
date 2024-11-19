<script lang="ts">
    import { Button } from "$lib/components"

    import * as constantsEnums from "@local/constants/enums"
    import { localePath } from "$i18n/helpers"

    export let provider: constantsEnums.OAuthProvider
    export let linkAccount = false

    interface ButtonData {
        buttonClass: string
        iconClass: string
        providerInUrl: string
        text: string
    }

    function getButtonData(p: constantsEnums.OAuthProvider): ButtonData {
        switch (p) {
            case constantsEnums.OAuthProvider.Twitch: {
                return {
                    buttonClass: "u:bg-purple-800! u:hover:bg-purple-700! u:active:bg-purple-900!",
                    iconClass: "u:i-mdi-twitch u:text-xl u:mr-1",
                    providerInUrl: "twitch",
                    text: "Twitch"
                }
            }
        }
    }

    $: buttonData = getButtonData(provider)
</script>

<Button
    class={buttonData.buttonClass}
    href={$localePath(`/auth/${linkAccount ? "link/oauth" : "login"}/${buttonData.providerInUrl}`)}
>
    <i class={buttonData.iconClass} />
    <span>{buttonData.text}</span>
</Button>
