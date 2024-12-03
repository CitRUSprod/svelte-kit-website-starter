<script lang="ts">
    import cn from "classnames"
    import { getElementVariantObject } from "$lib/utils"

    import type { ElementVariant } from "$lib/types"

    export let variant: ElementVariant = "default"
    export let label: string | undefined = undefined
    export let disabled = false
    export let readonly = false
    export let checked = false

    let klass: string | undefined = undefined
    export { klass as class }

    $: variants = getElementVariantObject(variant)

    function click() {
        if (!readonly && !disabled) {
            checked = !checked
        }
    }
</script>

<button
    class={cn(
        "u:inline-flex u:items-center u:w-auto u:gap-1 u:align-top",
        {
            "u:cursor-pointer": !disabled && !readonly,
            "u:opacity-50 u:cursor-not-allowed": disabled,
            "u:cursor-[default]": readonly
        },
        klass
    )}
    on:click={click}
>
    <span
        class={cn(
            "u:flex u:justify-center u:items-center u:w-6 u:h-6 u:text-content-lighter u:border u:rounded u:select-none",
            {
                "u:bg-content": !checked,
                "u:border-default": variants.default,
                "u:border-primary": variants.primary,
                "u:border-success": variants.success,
                "u:border-error": variants.error,
                "u:border-warning": variants.warning,
                "u:border-info": variants.info,
                "u:bg-default": checked && variants.default,
                "u:bg-primary": checked && variants.primary,
                "u:bg-success": checked && variants.success,
                "u:bg-error": checked && variants.error,
                "u:bg-warning": checked && variants.warning,
                "u:bg-info": checked && variants.info
            }
        )}
    >
        {#if checked}
            <i class="u:i-fa-solid-check u:text-sm" />
        {/if}
    </span>
    {#if label}
        <span class="u:ml-1">{label}</span>
    {/if}
</button>
