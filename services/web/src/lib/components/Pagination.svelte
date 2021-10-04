<script lang="ts">
    import { browser } from "$app/env"

    export let currentPage: number
    export let pageCount: number
    export let length = 5

    let klass = ""
    export { klass as class }

    let pages: Array<number> = []

    function updatePages(current: number, count: number, size: number) {
        const numbers = []

        const half = (size - 1) / 2
        const left = Math.floor(half)
        const right = Math.ceil(half)

        for (let i = current - left; i <= current + right; i++) {
            numbers.push(i)
        }

        while (numbers[0] < 1) {
            for (let i = 0; i < numbers.length; i++) {
                numbers[i]++
            }
        }

        while (numbers[numbers.length - 1] > count) {
            for (let i = 0; i < numbers.length; i++) {
                numbers[i]--
            }
        }

        pages = numbers.filter(n => n > 0)
    }

    $: updatePages(currentPage, pageCount, length)
</script>

{#if browser}
    <div class={klass}>
        <slot name="before" />
        {#each pages as page (page)}
            <slot pageNumber={page} />
        {/each}
        <slot name="after" />
    </div>
{/if}
