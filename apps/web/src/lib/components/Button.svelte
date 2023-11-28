<script lang="ts">
    import cn from "classnames"
    import { getElementVariantObject } from "$lib/utils"

    import type { ElementVariant } from "$lib/types"

    export let variant: ElementVariant = "default"
    export let href = undefined as string | undefined
    export let target: string | undefined = undefined
    export let rel: string | undefined = undefined
    export let text = false as boolean
    export let icon = false
    export let disabled = false as boolean
    export let loading = false as boolean

    let klass: string | undefined = undefined
    export { klass as class }

    $: variants = getElementVariantObject(variant)
</script>

<svelte:element
    this={href !== undefined && !disabled ? "a" : "button"}
    class={cn(
        "u:relative u:inline-flex u:justify-center u:items-center u:h-10 u:font-bold u:transition u:duration-200 u:align-top u:select-none",
        "u:active:transform",
        "u:disabled:cursor-not-allowed",
        {
            "u:px-4 u:rounded": !icon,
            "u:w-10 u:rounded-full": icon,
            "u:text-content-lighter": !text && !loading,
            "u:text-transparent": loading,
            "u:hover:bg-opacity-30 u:active:bg-opacity-30 u:dark:hover:bg-opacity-30 u:dark:active:bg-opacity-30":
                text,
            "u:active:scale-90": !disabled && !loading,
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
    {href}
    {rel}
    role="button"
    tabindex="0"
    {target}
    on:click
>
    <slot />
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
        >
            <i class="u:i-whh-loadingflowcw u:text-xl u:animate-spin" />
        </div>
    {/if}
</svelte:element>
