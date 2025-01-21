<script lang="ts">
    import { Checkbox, Label } from "bits-ui"
    import cn from "classnames"

    import type { ElementVariant } from "$lib/types"
    import { getElementVariantObject } from "$lib/utils"

    interface Props {
        variant?: ElementVariant
        label?: string
        disabled?: boolean
        readonly?: boolean
        checked?: boolean | "indeterminate"
        id?: string
        class?: string
        [key: string]: unknown
    }

    let {
        variant = "default",
        label = undefined,
        disabled = false,
        readonly = false,
        checked = $bindable(false),
        id = undefined,
        class: klass = undefined,
        ...rest
    }: Props = $props()

    const variants = $derived(getElementVariantObject(variant))
</script>

<span
    class={cn(
        "u:inline-flex u:items-center u:w-auto u:gap-1 u:align-top",
        {
            "u:cursor-pointer": !disabled && !readonly,
            "u:opacity-50 u:cursor-not-allowed": disabled,
            "u:cursor-[default]": readonly
        },
        klass
    )}
    {...rest}
>
    <Checkbox.Root {id} disabled={disabled || readonly} bind:checked>
        <Checkbox.Indicator
            class={cn(
                "u:flex u:justify-center u:items-center u:w-6 u:h-6 u:text-content-lighter u:border u:rounded u:cursor-inherit!",
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
            let:isChecked
            let:isIndeterminate
        >
            {#if isIndeterminate}
                <i class="u:i-fa-solid-minus u:text-sm"></i>
            {:else if isChecked}
                <i class="u:i-fa-solid-check u:text-sm"></i>
            {/if}
        </Checkbox.Indicator>
    </Checkbox.Root>
    {#if label && id}
        <Label.Root for={id} class="u:ml-1 u:cursor-inherit">{label}</Label.Root>
    {/if}
</span>
