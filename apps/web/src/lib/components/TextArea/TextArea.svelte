<script lang="ts">
    import type { HTMLTextareaAttributes } from "svelte/elements"

    import type { ComponentBasicProps } from "$lib/types"

    type Props = ComponentBasicProps & {
        value?: string
        placeholder?: string
        label?: string
        resizable?: boolean
        disabled?: boolean
        readonly?: boolean
        onInput?: HTMLTextareaAttributes["oninput"]
        onFocus?: HTMLTextareaAttributes["onfocus"]
        onBlur?: HTMLTextareaAttributes["onblur"]
        onKeyPress?: HTMLTextareaAttributes["onkeypress"]
    }

    let {
        class: klass = undefined,
        value = $bindable(""),
        placeholder = undefined,
        label = undefined,
        resizable = false,
        disabled = false,
        readonly = false,
        onInput = undefined,
        onFocus = undefined,
        onBlur = undefined,
        onKeyPress = undefined,
        ...rest
    }: Props = $props()

    let isFocused = $state(false)

    const isLabelFloating = $derived(isFocused || !!value || !!placeholder)

    const handleFocus: HTMLTextareaAttributes["onfocus"] = e => {
        isFocused = true
        onFocus?.(e)
    }

    const handleBlur: HTMLTextareaAttributes["onblur"] = e => {
        isFocused = false
        onBlur?.(e)
    }
</script>

<div
    class={[
        "u:relative u:flex u:items-center u:bg-content u:border u:border-default u:rounded",
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
                "u:absolute u:px-1 u:left-2 u:text-default-lighter u:select-none u:pointer-events-none u:z-1 u:transition-all u:duration-200 u:ease-in-out",
                {
                    "u:top-0 u:text-2xs": isLabelFloating,
                    "u:top-5 u:translate-y--1/2": !isLabelFloating
                }
            ]}
        >
            {label}
        </div>
    {/if}
    <textarea
        class={[
            "u:w-full u:h-40 u:px-3 u:py-2 u:bg-transparent u:outline-none",
            "u:placeholder-text-default u:placeholder-text-opacity-50",
            "u:disabled:cursor-not-allowed",
            {
                "u:pt-3": label,
                "u:resize-none": !resizable
            }
        ]}
        {disabled}
        {placeholder}
        {readonly}
        bind:value
        oninput={onInput}
        onfocus={handleFocus}
        onblur={handleBlur}
        onkeypress={onKeyPress}
    ></textarea>
</div>
