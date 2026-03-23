<script lang="ts">
    import type { Snippet } from "svelte"

    import Button from "./Button.svelte"

    import { ll } from "$i18n/helpers"
    import type { ComponentBasicProps, ComponentBasicVariant } from "$lib/types"
    import { getComponentBasicVariantMap } from "$lib/utils"

    type Props = ComponentBasicProps & {
        variant: ComponentBasicVariant
        visible?: boolean
        closable?: boolean
        onClose?(): void | Promise<void>
        children?: Snippet
    }

    let {
        class: klass = undefined,
        variant,
        visible = $bindable(true),
        closable = false,
        onClose = undefined,
        children = undefined,
        ...rest
    }: Props = $props()

    const variants = $derived(getComponentBasicVariantMap(variant))

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
            "u:flex u:w-full u:bg-content u:rounded-md u:border-2 u:overflow-hidden",
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
                "u:flex u:justify-center u:items-center u:flex-shrink-0 u:w-12 u:text-content-lighter",
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
        <div class="u:px-4 u:py-2 u:flex-1 u:min-w-0">
            <div class="u:flex u:justify-between">
                <b
                    class={[
                        "u:min-w-0 u:break-words",
                        {
                            "u:text-success": variants.success,
                            "u:text-error": variants.error,
                            "u:text-warning": variants.warning,
                            "u:text-info": variants.info
                        }
                    ]}
                >
                    {getTextByVariant(variant)}
                </b>
                {#if closable}
                    <Button class="u:mt--1 u:mr--3" size="xs" icon text {variant} onClick={close}>
                        <i class="u:i-fa-solid-times"></i>
                    </Button>
                {/if}
            </div>
            <p class="u:text-content-inverse u:text-sm u:break-words">
                {@render children?.()}
            </p>
        </div>
    </div>
{/if}
