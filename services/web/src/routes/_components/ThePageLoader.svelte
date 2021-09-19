<script lang="ts">
    import { fade } from "svelte/transition"
</script>

<div
    class="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-base-100 text-5xl z-[1000]"
    out:fade
>
    <div class="loader" />
</div>

<style lang="postcss">
    .loader {
        @apply relative w-[0.25em] h-[0.5em] my-0 mx-[0.5em] bg-current;
        animation: loader 1s ease-in-out infinite;
        animation-delay: 0.4s;

        &::after,
        &::before {
            @apply absolute w-[inherit] h-[inherit] bg-[color:inherit] content-[""];
            animation: inherit;
        }

        &::before {
            @apply right-[0.5em];
            animation-delay: 0.2s;
        }

        &::after {
            @apply left-[0.5em];
            animation-delay: 0.6s;
        }
    }

    @keyframes loader {
        0%,
        100% {
            box-shadow: 0 0 0 currentColor, 0 0 0 currentColor;
        }

        50% {
            box-shadow: 0 -0.25em 0 currentColor, 0 0.25em 0 currentColor;
        }
    }
</style>
