<script lang="ts">
    import type { Snippet } from "svelte"
    import type { ClassValue } from "svelte/elements"

    import Button from "./Button.svelte"

    import { ll } from "$i18n/helpers"
    import type { ElementBasicVariant } from "$lib/types"
    import { getElementBasicVariantObject } from "$lib/utils"

    interface Props {
        variant: ElementBasicVariant
        visible?: boolean
        closable?: boolean
        class?: ClassValue
        onClose?(): void
        children?: Snippet
        [key: string]: unknown
    }

    let {
        variant,
        visible = $bindable(true),
        closable = false,
        class: klass = undefined,
        onClose = undefined,
        children,
        ...rest
    }: Props = $props()

    const variants = $derived(getElementBasicVariantObject(variant))

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
        onClose?.()
        visible = false
    }
</script>

{#if visible}
    <div
        class={[
            "u:flex u:w-full u:rounded-md u:bg-content u:border-2",
            {
                "u:border-success": variants.success,
                "u:border-error": variants.error,
                "u:border-warning": variants.warning,
                "u:border-info": variants.info
            },
            klass
        ]}
        {...rest}
    >
        <div
            class={[
                "u:flex u:justify-center u:items-center u:w-12 u:text-content-lighter",
                {
                    "u:bg-success": variants.success,
                    "u:bg-error": variants.error,
                    "u:bg-warning": variants.warning,
                    "u:bg-info": variants.info
                }
            ]}
        >
            <i
                class={[
                    "u:text-xl",
                    {
                        "u:i-fa-solid-check": variants.success,
                        "u:i-fa-solid-times-circle": variants.error,
                        "u:i-fa-solid-exclamation-triangle": variants.warning,
                        "u:i-fa-solid-info-circle": variants.info
                    }
                ]}
            ></i>
        </div>
        <div class="u:flex u:flex-1 u:justify-between">
            <div class="u:px-4 u:py-2">
                <b
                    class={{
                        "u:text-success": variants.success,
                        "u:text-error": variants.error,
                        "u:text-warning": variants.warning,
                        "u:text-info": variants.info
                    }}
                >
                    {getTextByVariant(variant)}
                </b>
                <p class="u:text-content-inverse u:text-sm">
                    {@render children?.()}
                </p>
            </div>
            {#if closable}
                <div class="u:pr-2 u:py-2">
                    <Button icon text {variant} onclick={close}>
                        <i class="u:i-fa-solid-times u:text-xl"></i>
                    </Button>
                </div>
            {/if}
        </div>
    </div>
{/if}
