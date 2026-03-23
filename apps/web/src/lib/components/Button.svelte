<script lang="ts">
    import { Button } from "bits-ui"
    import type { Snippet } from "svelte"
    import type { HTMLButtonAttributes } from "svelte/elements"

    import type { ComponentBasicProps, ComponentVariant, ComponentSize } from "$lib/types"
    import { getComponentVariantMap, getComponentSizeMap } from "$lib/utils"

    type Props = ComponentBasicProps & {
        variant?: ComponentVariant
        size?: ComponentSize
        href?: string
        rel?: string
        target?: string
        text?: boolean
        icon?: boolean
        disabled?: boolean
        loading?: boolean
        onClick?: HTMLButtonAttributes["onclick"]
        children?: Snippet
    }

    const {
        class: klass = undefined,
        variant = "default",
        size = "md",
        href = undefined,
        text = false,
        icon = false,
        disabled = false,
        loading = false,
        onClick = undefined,
        children = undefined,
        ...rest
    }: Props = $props()

    const variants = $derived(getComponentVariantMap(variant))
    const sizes = $derived(getComponentSizeMap(size))
</script>

<Button.Root
    class={[
        "u:relative u:inline-flex u:justify-center u:items-center u:flex-shrink-0 u:font-bold u:transition u:duration-200 u:align-top u:whitespace-nowrap u:overflow-hidden",
        "u:disabled:cursor-not-allowed",
        {
            "u:rounded": !icon && (sizes.xs || sizes.sm),
            "u:rounded-md": !icon && sizes.md,
            "u:rounded-lg": !icon && sizes.lg,
            "u:rounded-xl": !icon && sizes.xl,
            "u:rounded-full": icon,
            "u:text-content-lighter": !text && !loading,
            "u:text-transparent": loading,
            "u:hover:bg-opacity-30 u:active:bg-opacity-30": text,
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
            "u:text-info": !loading && text && variants.info,
            "u:h-6 u:px-2 u:text-xs": !icon && sizes.xs,
            "u:h-8 u:px-3 u:text-sm": !icon && sizes.sm,
            "u:h-10 u:px-4 u:text-base": !icon && sizes.md,
            "u:h-12 u:px-5 u:text-lg": !icon && sizes.lg,
            "u:h-14 u:px-6 u:text-xl": !icon && sizes.xl,
            "u:w-6 u:h-6 u:text-xs": icon && sizes.xs,
            "u:w-8 u:h-8 u:text-sm": icon && sizes.sm,
            "u:w-10 u:h-10 u:text-base": icon && sizes.md,
            "u:w-12 u:h-12 u:text-lg": icon && sizes.lg,
            "u:w-14 u:h-14 u:text-xl": icon && sizes.xl
        },
        klass
    ]}
    disabled={disabled || loading}
    href={(href && !disabled && !loading ? href : undefined) as any}
    onclick={onClick}
    {...rest}
>
    {@render children?.()}
    {#if loading}
        <div
            class={[
                "u:absolute u:top-0 u:left-0 u:flex u:justify-center u:items-center u:w-full u:h-full",
                {
                    "u:rounded-sm": !icon && sizes.xs,
                    "u:rounded": !icon && sizes.sm,
                    "u:rounded-md": !icon && sizes.md,
                    "u:rounded-lg": !icon && sizes.lg,
                    "u:rounded-xl": !icon && sizes.xl,
                    "u:rounded-full": icon,
                    "u:text-content-lighter": !text,
                    "u:text-default": text && variants.default,
                    "u:text-primary": text && variants.primary,
                    "u:text-success": text && variants.success,
                    "u:text-error": text && variants.error,
                    "u:text-warning": text && variants.warning,
                    "u:text-info": text && variants.info
                }
            ]}
        >
            <i class="u:i-whh-loadingflowcw u:animate-spin"></i>
        </div>
    {/if}
</Button.Root>
