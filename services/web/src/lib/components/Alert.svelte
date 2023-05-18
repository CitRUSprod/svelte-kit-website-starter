<script lang="ts">
    import Button from "./Button.svelte"

    import { createEventDispatcher } from "svelte"
    import classNames from "classnames"
    import { t } from "$lib/locales"
    import { getElementBasicTypeObject } from "$lib/utils"

    import type { ElementBasicType } from "$lib/types"

    export let type: ElementBasicType
    export let visible = true
    export let closable = false

    let klass: string | undefined = undefined
    export { klass as class }

    $: types = getElementBasicTypeObject(type)

    const dispatch = createEventDispatcher()

    function getTextByType(localType: string) {
        switch (localType) {
            case "success":
                return $t("components.alert.success")
            case "error":
                return $t("components.alert.error")
            case "warning":
                return $t("components.alert.warning")
            default:
                return $t("components.alert.info")
        }
    }

    function close() {
        dispatch("close")
        visible = false
    }
</script>

{#if visible}
    <div
        class={classNames(
            "u:flex u:w-full u:rounded-md u:bg-content u:border-2",
            {
                "u:border-success": types.success,
                "u:border-error": types.error,
                "u:border-warning": types.warning,
                "u:border-info": types.info
            },
            klass
        )}
    >
        <div
            class={classNames(
                "u:flex u:justify-center u:items-center u:w-12 u:text-content-lighter",
                {
                    "u:bg-success": types.success,
                    "u:bg-error": types.error,
                    "u:bg-warning": types.warning,
                    "u:bg-info": types.info
                }
            )}
        >
            <i
                class={classNames("u:text-xl", {
                    "u:i-fa-solid-check": types.success,
                    "u:i-fa-solid-times-circle": types.error,
                    "u:i-fa-solid-exclamation-triangle": types.warning,
                    "u:i-fa-solid-info-circle": types.info
                })}
            />
        </div>
        <div class="u:flex u:flex-1 u:justify-between">
            <div class="u:px-4 u:py-2">
                <b
                    class={classNames({
                        "u:text-success": types.success,
                        "u:text-error": types.error,
                        "u:text-warning": types.warning,
                        "u:text-info": types.info
                    })}
                >
                    {getTextByType(type)}
                </b>
                <p class="u:text-content-inverse u:text-sm">
                    <slot />
                </p>
            </div>
            {#if closable}
                <div class="u:pr-2 u:py-2">
                    <Button icon text {type} on:click={close}>
                        <i class="u:i-fa-solid-times u:text-xl" />
                    </Button>
                </div>
            {/if}
        </div>
    </div>
{/if}
