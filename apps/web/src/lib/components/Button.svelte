<script lang="ts">
    import { Button } from "bits-ui"
    import cn from "classnames"
    import type { Snippet } from "svelte"

    import type { ElementVariant } from "$lib/types"
    import { getElementVariantObject } from "$lib/utils"

    interface Props {
        variant?: ElementVariant
        href?: string | undefined
        text?: boolean
        icon?: boolean
        disabled?: boolean
        loading?: boolean
        class?: string | undefined
        children?: Snippet
        [key: string]: unknown
    }

    const {
        variant = "default",
        href = undefined,
        text = false,
        icon = false,
        disabled = false,
        loading = false,
        class: klass = undefined,
        children,
        ...rest
    }: Props = $props()

    const variants = $derived(getElementVariantObject(variant))
</script>

<Button.Root
    class={cn(
        "u:relative u:inline-flex u:justify-center u:items-center u:h-10 u:font-bold u:transition u:duration-200 u:align-top",
        "u:disabled:cursor-not-allowed",
        {
            "u:px-4 u:rounded": !icon,
            "u:w-10 u:rounded-full": icon,
            "u:text-content-lighter": !text && !loading,
            "u:text-transparent": loading,
            "u:hover:bg-opacity-30 u:active:bg-opacity-30 u:dark:hover:bg-opacity-30 u:dark:active:bg-opacity-30":
                text,
            "u:active:transform u:active:scale-90": !disabled && !loading,
            "u:disabled:opacity-50": disabled,
            "u:bg-default": !text && variants.default,
            "u:bg-primary": !text && variants.primary,
            "u:bg-success": !text && variants.success,
            "u:bg-error": !text && variants.error,
            "u:bg-warning": !text && variants.warning,
            "u:bg-info": !text && variants.info,
            "u:hover:bg-default-lighter u:active:bg-default-darker": !disabled && variants.default,
            "u:hover:bg-primary-lighter u:active:bg-primary-darker": !disabled && variants.primary,
            "u:hover:bg-success-lighter u:active:bg-success-darker": !disabled && variants.success,
            "u:hover:bg-error-lighter u:active:bg-error-darker": !disabled && variants.error,
            "u:hover:bg-warning-lighter u:active:bg-warning-darker": !disabled && variants.warning,
            "u:hover:bg-info-lighter u:active:bg-info-darker": !disabled && variants.info,
            "u:text-default": !loading && text && variants.default,
            "u:text-primary": !loading && text && variants.primary,
            "u:text-success": !loading && text && variants.success,
            "u:text-error": !loading && text && variants.error,
            "u:text-warning": !loading && text && variants.warning,
            "u:text-info": !loading && text && variants.info
        },
        klass
    )}
    disabled={disabled || loading}
    href={href && !disabled && !loading ? href : undefined}
    {...rest}
>
    {@render children?.()}
    {#if loading}
        <div
            class={cn(
                "u:absolute u:top-0 u:left-0 u:flex u:justify-center u:items-center u:w-full u:h-full",
                {
                    "u:rounded": !icon,
                    "u:rounded-full": icon,
                    "u:text-content-lighter": !text,
                    "u:text-default": text && variants.default,
                    "u:text-primary": text && variants.primary,
                    "u:text-success": text && variants.success,
                    "u:text-error": text && variants.error,
                    "u:text-warning": text && variants.warning,
                    "u:text-info": text && variants.info
                }
            )}
            data-indicator="loading"
        >
            <i class="u:i-whh-loadingflowcw u:text-xl u:animate-spin"></i>
        </div>
    {/if}
</Button.Root>
