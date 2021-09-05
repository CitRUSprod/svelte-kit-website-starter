<script lang="ts">
    import FaIcon from "svelte-fa"
    import { Button } from "$lib/components"

    import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"
    import { theme } from "$lib/stores"

    const { dark } = theme
    const pages = [1, 2, 3, 4]
</script>

<div class="bg-neutral shadow-lg text-neutral-content mb-2 navbar">
    <div class="flex-none mx-2 px-2">
        <a class="font-bold text-lg" href="/">SvelteKit Website Template</a>
    </div>
    <div class="flex-1 justify-end mx-2 px-2">
        <Button class="rounded-btn btn-ghost btn-sm" href="/chat">Chat</Button>
        {#each pages as page}
            <Button class="rounded-btn btn-ghost btn-sm" href={`/page/${page}`}>
                Page {page}
            </Button>
        {/each}
        <Button class="rounded-btn btn-ghost btn-sm" on:click={theme.toggle}>
            <FaIcon icon={$dark ? faSun : faMoon} />
        </Button>
    </div>
</div>
