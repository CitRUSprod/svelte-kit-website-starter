<script lang="ts">
    import { Input } from "./internal"

    import classNames from "classnames"
    import { getElementTypeObject } from "$lib/utils"

    import type { ElementType } from "$lib/types"

    export let type: ElementType = "default"
    export let placeholder: string | undefined = undefined
    export let label: string | undefined = undefined
    export let valueType = "text"
    export let disabled = false
    export let readonly = false
    export let autofocus = false
    export let value: string | number | null | undefined = undefined
    export let leftIconClass: string | undefined = undefined
    export let rightIconClass: string | undefined = undefined

    let klass: string | undefined = undefined
    export { klass as class }

    $: types = getElementTypeObject(type)
</script>

<div
    class={classNames(
        "u:relative u:flex u:items-center",
        {
            "u:opacity-50": disabled,
            "u:text-default": types.default,
            "u:text-primary": types.primary,
            "u:text-success": types.success,
            "u:text-error": types.error,
            "u:text-warning": types.warning,
            "u:text-info": types.info
        },
        klass
    )}
>
    {#if label}
        <div
            class="u:absolute u:left-3 u:top--1.8 u:px-0.5 u:bg-content u:text-xs u:select-none u:pointer-events-none u:z-1"
        >
            {label}
        </div>
    {/if}
    {#if leftIconClass}
        <i class={`u:absolute u:left-3 u:pointer-events-none u:text-xl ${leftIconClass}`} />
    {/if}
    <Input
        class={classNames(
            "u:w-full u:h-10 u:px-3 u:bg-content u:text-content-inverse u:border u:rounded u:placeholder-opacity-80 u:outline-none",
            "u:dark:placeholder-opacity-80",
            "u:disabled:cursor-not-allowed",
            {
                "u:pl-10": leftIconClass,
                "u:pr-10": rightIconClass,
                "u:border-default u:placeholder-text-default-lighter": types.default,
                "u:border-primary u:placeholder-text-primary-lighter": types.primary,
                "u:border-success u:placeholder-text-success-lighter": types.success,
                "u:border-error u:placeholder-text-error-lighter": types.error,
                "u:border-warning u:placeholder-text-warning-lighter": types.warning,
                "u:border-info u:placeholder-text-info-lighter": types.info
            }
        )}
        {autofocus}
        {disabled}
        {placeholder}
        {readonly}
        type={valueType}
        bind:value
        on:keypress
        on:focus
        on:blur
    />
    {#if rightIconClass}
        <i class={`u:absolute u:right-3 u:pointer-events-none u:text-xl ${rightIconClass}`} />
    {/if}
</div>
