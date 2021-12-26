<script lang="ts">
    import Button from "./Button.svelte"
    import Pagination from "./Pagination.svelte"
    import * as Icon from "./Icon"

    import { createEventDispatcher } from "svelte"

    export let currentPage: number
    export let pageCount: number
    export let length = 5
    export let pathname: string
    export let query: Record<string, any>
    export let itemsPerPage = 10
    export let itemsPerPageText = "Items per page:"

    const itemsPerPageOptions = [10, 25, 50, 100]

    function getUrl(pageNumber: number, queryParams: Record<string, any>) {
        const params = new URLSearchParams()
        const keys = Object.keys(queryParams)

        for (const key of keys) {
            if (queryParams[key]) {
                params.set(key, queryParams[key].toString())
            }
        }

        params.set("page", pageNumber.toString())

        return `${pathname}?${params.toString()}`
    }

    const dispatch = createEventDispatcher()

    function onChangeItemsPerPage() {
        dispatch("changeItemsPerPage")
    }
</script>

<div class="flex justify-between">
    <Pagination class="btn-group" {currentPage} {pageCount} {length} let:pageNumber>
        <svelte:fragment slot="before">
            <Button class="btn-info" href={getUrl(1, query)} disabled={currentPage === 1}>
                <Icon.AngleDoubleLeft />
            </Button>
            <Button
                class="btn-info !mx-1"
                href={getUrl(currentPage - 1, query)}
                disabled={currentPage === 1}
            >
                <Icon.AngleLeft />
            </Button>
        </svelte:fragment>
        {#if currentPage === pageNumber}
            <Button class="btn-active">{pageNumber}</Button>
        {:else}
            <Button class="btn-info" href={getUrl(pageNumber, query)}>{pageNumber}</Button>
        {/if}
        <svelte:fragment slot="after">
            <Button
                class="btn-info !mx-1"
                href={getUrl(currentPage + 1, query)}
                disabled={currentPage === pageCount}
            >
                <Icon.AngleRight />
            </Button>
            <Button
                class="btn-info"
                href={getUrl(pageCount, query)}
                disabled={currentPage === pageCount}
            >
                <Icon.AngleDoubleRight />
            </Button>
        </svelte:fragment>
    </Pagination>
    <div>
        <span class="mr-4">{itemsPerPageText}</span>
        <select
            class="select select-primary"
            bind:value={itemsPerPage}
            on:change={onChangeItemsPerPage}
        >
            {#each itemsPerPageOptions as option}
                <option value={option}>{option}</option>
            {/each}
        </select>
    </div>
</div>
