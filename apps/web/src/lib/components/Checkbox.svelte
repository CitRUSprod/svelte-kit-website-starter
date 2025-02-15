<script lang="ts">
    import { Checkbox, Label, useId } from "bits-ui"
    import cn from "classnames"

    import type { ElementVariant } from "$lib/types"
    import { getElementVariantObject } from "$lib/utils"

    interface Props {
        variant?: ElementVariant
        label?: string | undefined
        disabled?: boolean
        readonly?: boolean
        indeterminate?: boolean
        checked?: boolean
        class?: string | undefined
        [key: string]: unknown
    }

    let {
        variant = "default",
        label = undefined,
        disabled = false,
        readonly = false,
        indeterminate = $bindable(false),
        checked = $bindable(false),
        class: klass = undefined,
        ...rest
    }: Props = $props()

    const variants = $derived(getElementVariantObject(variant))

    const id = useId()
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
    <Checkbox.Root
        class={cn(
            "u:flex u:justify-center u:items-center u:w-6 u:h-6 u:text-content-lighter u:border u:rounded u:cursor-inherit!",
            {
                "u:bg-content": !checked && !indeterminate,
                "u:border-default": variants.default,
                "u:border-primary": variants.primary,
                "u:border-success": variants.success,
                "u:border-error": variants.error,
                "u:border-warning": variants.warning,
                "u:border-info": variants.info,
                "u:bg-default": (checked || indeterminate) && variants.default,
                "u:bg-primary": (checked || indeterminate) && variants.primary,
                "u:bg-success": (checked || indeterminate) && variants.success,
                "u:bg-error": (checked || indeterminate) && variants.error,
                "u:bg-warning": (checked || indeterminate) && variants.warning,
                "u:bg-info": (checked || indeterminate) && variants.info
            }
        )}
        {id}
        disabled={disabled || readonly}
        bind:indeterminate
        bind:checked
    >
        {#snippet children({ checked: c, indeterminate: i })}
            {#if i}
                <i class="u:i-fa-solid-minus u:text-sm"></i>
            {:else if c}
                <i class="u:i-fa-solid-check u:text-sm"></i>
            {/if}
        {/snippet}
    </Checkbox.Root>
    {#if label}
        <Label.Root for={id} class="u:ml-1 u:cursor-inherit">{label}</Label.Root>
    {/if}
</span>
