<script lang="ts">
    import classNames from "classnames"
    import { getElementTypeObject } from "$lib/utils"

    import type { ElementType } from "$lib/types"

    export let type: ElementType = "default"
    export let href = undefined as string | undefined
    export let target: string | undefined = undefined
    export let rel: string | undefined = undefined
    export let text = false as boolean
    export let icon = false
    export let disabled = false as boolean
    export let loading = false as boolean

    let klass: string | undefined = undefined
    export { klass as class }

    $: types = getElementTypeObject(type)
</script>

<button
    class={classNames(
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
            "u:bg-default": !text && types.default,
            "u:bg-primary": !text && types.primary,
            "u:bg-success": !text && types.success,
            "u:bg-error": !text && types.error,
            "u:bg-warning": !text && types.warning,
            "u:bg-info": !text && types.info,
            "u:hover:bg-default-lighter u:active:bg-default-darker": !disabled && types.default,
            "u:hover:bg-primary-lighter u:active:bg-primary-darker": !disabled && types.primary,
            "u:hover:bg-success-lighter u:active:bg-success-darker": !disabled && types.success,
            "u:hover:bg-error-lighter u:active:bg-error-darker": !disabled && types.error,
            "u:hover:bg-warning-lighter u:active:bg-warning-darker": !disabled && types.warning,
            "u:hover:bg-info-lighter u:active:bg-info-darker": !disabled && types.info,
            "u:text-default": !loading && text && types.default,
            "u:text-primary": !loading && text && types.primary,
            "u:text-success": !loading && text && types.success,
            "u:text-error": !loading && text && types.error,
            "u:text-warning": !loading && text && types.warning,
            "u:text-info": !loading && text && types.info
        },
        klass
    )}
    disabled={disabled || loading}
    on:click
>
    <slot />
    {#if loading}
        <div
            class={classNames(
                "u:absolute u:top-0 u:left-0 u:flex u:justify-center u:items-center u:w-full u:h-full",
                {
                    "u:rounded": !icon,
                    "u:rounded-full": icon,
                    "u:text-content-lighter": !text,
                    "u:text-default": text && types.default,
                    "u:text-primary": text && types.primary,
                    "u:text-success": text && types.success,
                    "u:text-error": text && types.error,
                    "u:text-warning": text && types.warning,
                    "u:text-info": text && types.info
                }
            )}
        >
            <i class="u:i-whh-loadingflowcw u:text-xl u:animate-spin" />
        </div>
    {:else if href !== undefined && !disabled}
        <!-- svelte-ignore a11y-missing-content -->
        <a
            class={classNames("u:absolute u:top-0 u:left-0 u:w-full u:h-full", {
                "u:rounded": !icon,
                "u:rounded-full": icon
            })}
            {href}
            {rel}
            {target}
        />
    {/if}
</button>
