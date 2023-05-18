<script lang="ts">
    import { Dialog, Transition, TransitionChild } from "@rgossiaux/svelte-headlessui"

    import classNames from "classnames"

    export let visible = false
    export let persistent = false

    let klass: string | undefined = undefined
    export { klass as class }

    function close() {
        if (!persistent) {
            visible = false
        }
    }
</script>

<Transition appear show={visible}>
    <Dialog on:close={close}>
        <TransitionChild
            enter="u:ease-out u:duration-300"
            enterFrom="u:opacity-0"
            enterTo="u:opacity-100"
            leave="u:ease-in u:duration-200"
            leaveFrom="u:opacity-100"
            leaveTo="u:opacity-0"
        >
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="u:fixed u:inset-0 u:flex u:justify-center u:items-center u:p-4 u:bg-black u:bg-opacity-30"
                on:click={close}
            >
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                    class={classNames("u:p-8 u:bg-content u:shadow-md u:rounded-md", klass)}
                    on:click|stopPropagation
                >
                    <slot />
                </div>
            </div>
        </TransitionChild>
    </Dialog>
</Transition>
