<script lang="ts">
    import { Button } from "$lib/components"

    import * as constantsEnums from "@local/constants/enums"
    import { localePath } from "$i18n/helpers"

    interface Props {
        provider: constantsEnums.OAuthProvider
        linkAccount?: boolean
        [key: string]: unknown
    }

    const { provider, linkAccount = false, ...rest }: Props = $props()

    interface ButtonData {
        buttonClass: string
        iconClass: string
        providerInUrl: string
        text: string
    }

    function getButtonData(p: constantsEnums.OAuthProvider): ButtonData {
        const twitchButtonData: ButtonData = {
            buttonClass: "u:bg-purple-800! u:hover:bg-purple-700! u:active:bg-purple-900!",
            iconClass: "u:i-mdi-twitch u:text-xl u:mr-1",
            providerInUrl: "twitch",
            text: "Twitch"
        }

        switch (p) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            case constantsEnums.OAuthProvider.Twitch: {
                return twitchButtonData
            }
            default: {
                return twitchButtonData
            }
        }
    }

    const buttonData = $derived(getButtonData(provider))
</script>

<Button
    class={buttonData.buttonClass}
    href={$localePath(`/auth/${linkAccount ? "link/oauth" : "login"}/${buttonData.providerInUrl}`)}
    {...rest}
>
    <i class={buttonData.iconClass}></i>
    <span>{buttonData.text}</span>
</Button>
