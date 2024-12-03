<script lang="ts">
    import Button from "./Button/Button.svelte"

    import { createEventDispatcher } from "svelte"
    import cn from "classnames"
    import { ll } from "$i18n/helpers"
    import { getElementBasicVariantObject } from "$lib/utils"

    import type { ElementBasicVariant } from "$lib/types"

    export let variant: ElementBasicVariant
    export let visible = true
    export let closable = false

    let klass: string | undefined
    export { klass as class }

    $: variants = getElementBasicVariantObject(variant)

    const dispatch = createEventDispatcher<{ close: undefined }>()

    function getTextByVariant(localVariant: string) {
        switch (localVariant) {
            case "success":
                return $ll.success()
            case "error":
                return $ll.error()
            case "warning":
                return $ll.warning()
            default:
                return $ll.info()
        }
    }

    function close() {
        dispatch("close")
        visible = false
    }
</script>

{#if visible}
    <div
        class={cn(
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
            class={cn("u:flex u:justify-center u:items-center u:w-12 u:text-content-lighter", {
                "u:bg-success": variants.success,
                "u:bg-error": variants.error,
                "u:bg-warning": variants.warning,
                "u:bg-info": variants.info
            })}
        >
            <i
                class={cn("u:text-xl", {
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
                    class={cn({
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
