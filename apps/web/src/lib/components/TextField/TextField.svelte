<script lang="ts">
    import type { ClassValue, HTMLInputAttributes } from "svelte/elements"

    import type { ComponentBasicProps } from "$lib/types"

    type Props = ComponentBasicProps & {
        value?: string
        label?: string
        placeholder?: string
        type?: "text" | "password"
        disabled?: boolean
        readonly?: boolean
        leftIconClass?: ClassValue
        rightIconClass?: ClassValue
        onInput?: HTMLInputAttributes["oninput"]
        onFocus?: HTMLInputAttributes["onfocus"]
        onBlur?: HTMLInputAttributes["onblur"]
        onKeyPress?: HTMLInputAttributes["onkeypress"]
    }

    let {
        class: klass = undefined,
        value = $bindable(""),
        label = undefined,
        placeholder = undefined,
        type = "text",
        disabled = false,
        readonly = false,
        leftIconClass = undefined,
        rightIconClass = undefined,
        onInput = undefined,
        onFocus = undefined,
        onBlur = undefined,
        onKeyPress = undefined,
        ...rest
    }: Props = $props()

    let isFocused = $state(false)

    const isLabelFloating = $derived(isFocused || !!value || !!placeholder)

    const handleFocus: HTMLInputAttributes["onfocus"] = e => {
        isFocused = true
        onFocus?.(e)
    }

    const handleBlur: HTMLInputAttributes["onblur"] = e => {
        isFocused = false
        onBlur?.(e)
    }
</script>

<div
    class={[
        "u:relative u:flex u:items-center u:bg-content u:border u:border-default-lighter u:rounded",
        {
            "u:opacity-50": disabled
        },
        klass
    ]}
    {...rest}
>
    {#if label}
        <div
            class={[
                "u:absolute u:px-1 u:text-default-lighter u:select-none u:pointer-events-none u:z-1 u:transition-all u:duration-200 u:ease-in-out",
                {
                    "u:top-0 u:text-2xs": isLabelFloating,
                    "u:top-1/2 u:translate-y--1/2": !isLabelFloating,
                    "u:left-2": !leftIconClass,
                    "u:left-9": leftIconClass
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
    <input
        class={[
            "u:w-full u:h-10 u:px-3 u:bg-transparent u:outline-none",
            "u:placeholder-text-default u:placeholder-text-opacity-50",
            "u:disabled:cursor-not-allowed",
            {
                "u:pt-1": label,
                "u:pl-10": leftIconClass,
                "u:pr-10": rightIconClass
            }
        ]}
        {disabled}
        {placeholder}
        {readonly}
        {type}
        bind:value
        oninput={onInput}
        onfocus={handleFocus}
        onblur={handleBlur}
        onkeypress={onKeyPress}
    />
    {#if rightIconClass}
        <i
            class={[
                "u:absolute u:right-3 u:text-default-lighter u:pointer-events-none u:text-xl",
                rightIconClass
            ]}
        ></i>
    {/if}
</div>
