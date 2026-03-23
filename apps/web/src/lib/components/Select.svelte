<script lang="ts">
    import { Select } from "bits-ui"
    import type { ClassValue } from "svelte/elements"

    import type { ComponentBasicProps } from "$lib/types"

    interface SelectItem {
        text: string
        value: string
    }

    type Props = ComponentBasicProps & {
        value: string | undefined
        items?: Array<SelectItem>
        label?: string
        disabled?: boolean
        leftIconClass?: ClassValue
        rightIconClass?: ClassValue
        onChange?(value: string | undefined): void
    }

    let {
        class: klass = undefined,
        value = $bindable(),
        items = [],
        label = undefined,
        disabled = false,
        leftIconClass = undefined,
        rightIconClass = "u:i-ic-baseline-keyboard-arrow-down",
        onChange,
        ...rest
    }: Props = $props()

    const selectedText = $derived(items.find(item => item.value === value)?.text)
</script>

<Select.Root type="single" bind:value onValueChange={onChange} {...rest}>
    <Select.Trigger
        class={[
            "u:relative u:flex u:items-center u:w-full u:h-10 u:px-3 u:bg-content! u:border-default-lighter u:border u:rounded u:text-left u:outline-none u:appearance-none u:cursor-pointer",
            "u:disabled:cursor-not-allowed",
            {
                "u:pl-10": leftIconClass,
                "u:pr-10": rightIconClass,
                "u:opacity-50": disabled
            },
            klass
        ]}
    >
        {#if label}
            <div
                class={[
                    "u:absolute u:top-0 u:text-default-lighter u:text-2xs u:select-none u:pointer-events-none u:z-1",
                    {
                        "u:left-3": !leftIconClass,
                        "u:left-10": leftIconClass
                    }
                ]}
            >
                {label}
            </div>
        {/if}
        {#if leftIconClass}
            <i
                class={[
                    "u:absolute u:left-3 u:text-default-lighter u:pointer-events-none u:text-xl",
                    leftIconClass
                ]}
            ></i>
        {/if}
        <div
            class={[
                "u:text-content-lighter u:text-nowrap u:overflow-hidden u:text-ellipsis",
                {
                    "u:mt-2": label
                }
            ]}
        >
            {selectedText}
        </div>
        {#if rightIconClass}
            <i
                class={[
                    "u:absolute u:right-3 u:text-default-lighter u:pointer-events-none u:text-xl",
                    rightIconClass
                ]}
            ></i>
        {/if}
    </Select.Trigger>
    <Select.Portal>
        <Select.Content class="u:z-100000">
            <Select.Viewport
                class={[
                    "u:w-[var(--bits-select-anchor-width)] u:bg-content u:text-content-lighter u:border-default-lighter u:border u:rounded u:outline-none u:appearance-none u:cursor-pointer",
                    "u:disabled:cursor-not-allowed"
                ]}
            >
                {#each items as { value: v, text } (v)}
                    <Select.Item value={v} label={text}>
                        {#snippet children({ selected })}
                            <div
                                class={[
                                    "u:px-3 u:py-2 u:text-nowrap u:overflow-hidden u:text-ellipsis u:transition u:duration-200",
                                    "u:hover:bg-content-lighter u:hover:text-content-lighter u:hover:bg-opacity-10",
                                    {
                                        "u:text-content-lighter": selected
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
