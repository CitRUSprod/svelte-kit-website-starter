<script lang="ts">
    import Button from "./Button.svelte"

    import { createEventDispatcher } from "svelte"
    import classNames from "classnames"
    import { t } from "$lib/locales"
    import { getElementBasicVariantObject } from "$lib/utils"

    import type { ElementBasicVariant } from "$lib/types"

    export let variant: ElementBasicVariant
    export let visible = true
    export let closable = false

    let klass: string | undefined = undefined
    export { klass as class }

    $: variants = getElementBasicVariantObject(variant)

    const dispatch = createEventDispatcher()

    function getTextByVariant(localVariant: string) {
        switch (localVariant) {
            case "success":
                return $t("components.alert.success")
            case "error":
                return $t("components.alert.error")
            case "warning":
                return $t("components.alert.warning")
            default:
                return $t("components.alert.info")
        }
    }

    function close() {
        dispatch("close")
        visible = false
    }
</script>

{#if visible}
    <div
        class={classNames(
            "u:flex u:w-full u:rounded-md u:bg-content u:border-2",
            {
                "u:border-success": variants.success,
                "u:border-error": variants.error,
                "u:border-warning": variants.warning,
                "u:border-info": variants.info
            },
            klass
        )}
    >
        <div
            class={classNames(
                "u:flex u:justify-center u:items-center u:w-12 u:text-content-lighter",
                {
                    "u:bg-success": variants.success,
                    "u:bg-error": variants.error,
                    "u:bg-warning": variants.warning,
                    "u:bg-info": variants.info
                }
            )}
        >
            <i
                class={classNames("u:text-xl", {
                    "u:i-fa-solid-check": variants.success,
                    "u:i-fa-solid-times-circle": variants.error,
                    "u:i-fa-solid-exclamation-triangle": variants.warning,
                    "u:i-fa-solid-info-circle": variants.info
                })}
            />
        </div>
        <div class="u:flex u:flex-1 u:justify-between">
            <div class="u:px-4 u:py-2">
                <b
                    class={classNames({
                        "u:text-success": variants.success,
                        "u:text-error": variants.error,
                        "u:text-warning": variants.warning,
                        "u:text-info": variants.info
                    })}
                >
                    {getTextByVariant(variant)}
                </b>
                <p class="u:text-content-inverse u:text-sm">
                    <slot />
                </p>
            </div>
            {#if closable}
                <div class="u:pr-2 u:py-2">
                    <Button icon text {variant} on:click={close}>
                        <i class="u:i-fa-solid-times u:text-xl" />
                    </Button>
                </div>
            {/if}
        </div>
    </div>
{/if}
