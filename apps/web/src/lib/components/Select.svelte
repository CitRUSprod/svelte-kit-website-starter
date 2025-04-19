<script lang="ts">
    import { Select } from "bits-ui"
    import type { ClassValue } from "svelte/elements"

    import type { ElementVariant } from "$lib/types"
    import { getElementVariantObject } from "$lib/utils"

    interface Props {
        variant?: ElementVariant
        label?: string
        disabled?: boolean
        value: string | undefined
        items?: Array<{ text: string; value: string }>
        leftIconClass?: string
        rightIconClass?: string
        class?: ClassValue
        onChange?(value: string | undefined): void
        [key: string]: unknown
    }

    let {
        variant = "default",
        label = undefined,
        disabled = false,
        value = $bindable(),
        items = [],
        leftIconClass = undefined,
        rightIconClass = "u:i-ic-baseline-keyboard-arrow-down",
        class: klass = undefined,
        onChange,
        ...rest
    }: Props = $props()

    const variants = $derived(getElementVariantObject(variant))

    const selectedText = $derived(items.find(item => item.value === value)?.text)
</script>

<Select.Root type="single" bind:value onValueChange={onChange} {...rest}>
    <Select.Trigger
        class={[
            "u:relative u:flex u:items-center u:w-full u:h-10 u:px-3 u:bg-content u:border u:rounded u:text-left u:outline-none u:appearance-none u:cursor-pointer",
            "u:disabled:cursor-not-allowed",
            {
                "u:pl-10": leftIconClass,
                "u:pr-10": rightIconClass,
                "u:opacity-50": disabled,
                "u:text-default u:border-default": variants.default,
                "u:text-primary u:border-primary": variants.primary,
                "u:text-success u:border-success": variants.success,
                "u:text-error u:border-error": variants.error,
                "u:text-warning u:border-warning": variants.warning,
                "u:text-info u:border-info": variants.info
            },
            klass
        ]}
    >
        {#if label}
            <div
                class="u:absolute u:left-3 u:top--1.8 u:px-0.5 u:bg-content u:text-xs u:select-none u:pointer-events-none u:z-1"
            >
                {label}
            </div>
        {/if}
        {#if leftIconClass}
            <i class={`u:absolute u:left-3 u:pointer-events-none u:text-xl ${leftIconClass}`}></i>
        {/if}
        <div class="u:text-content-inverse u:text-nowrap u:overflow-hidden u:text-ellipsis">
            {selectedText}
        </div>
        {#if rightIconClass}
            <i class={`u:absolute u:right-3 u:pointer-events-none u:text-xl ${rightIconClass}`}></i>
        {/if}
    </Select.Trigger>
    <Select.Portal>
        <Select.Content class="u:z-100">
            <Select.Viewport
                class={[
                    "u:w-[var(--bits-select-anchor-width)] u:bg-content u:text-content-inverse u:border u:rounded u:outline-none u:appearance-none u:cursor-pointer",
                    "u:disabled:cursor-not-allowed",
                    {
                        "u:text-default u:border-default": variants.default,
                        "u:text-primary u:border-primary": variants.primary,
                        "u:text-success u:border-success": variants.success,
                        "u:text-error u:border-error": variants.error,
                        "u:text-warning u:border-warning": variants.warning,
                        "u:text-info u:border-info": variants.info
                    }
                ]}
            >
                {#each items as { value: v, text } (v)}
                    <Select.Item value={v} label={text}>
                        {#snippet children({ selected })}
                            <div
                                class={[
                                    "u:px-3 u:py-2 u:text-nowrap u:overflow-hidden u:text-ellipsis u:transition u:duration-200",
                                    "u:hover:bg-content-inverse u:hover:text-content-inverse u:hover:bg-opacity-10 u:dark:hover:bg-opacity-10",
                                    {
                                        "u:text-content-inverse": selected
                                    }
                                ]}
                                title={text}
                            >
                                {text}
                            </div>
                        {/snippet}
                    </Select.Item>
                {/each}
            </Select.Viewport>
        </Select.Content>
    </Select.Portal>
</Select.Root>
