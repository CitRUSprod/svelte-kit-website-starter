<script lang="ts">
    import FaIcon from "svelte-fa"
    import Button from "./Button.svelte"
    import Pagination from "./Pagination.svelte"

    import { createEventDispatcher } from "svelte"
    import {
        faAngleDoubleLeft,
        faAngleDoubleRight,
        faAngleLeft,
        faAngleRight
    } from "@fortawesome/free-solid-svg-icons"

    export let currentPage: number
    export let pageCount: number
    export let length = 5
    export let href: string
    export let itemsPerPage = 10
    export let itemsPerPageText = "Items per page:"

    const itemsPerPageOptions = [10, 25, 50, 100]

    const dispatch = createEventDispatcher()

    function onChangeItemsPerPage() {
        dispatch("changeItemsPerPage")
    }
</script>

<div class="flex justify-between">
    <Pagination class="btn-group" {currentPage} {pageCount} {length} let:pageNumber>
        <svelte:fragment slot="before">
            <Button href="{href}?page=1" disabled={currentPage === 1}>
                <FaIcon icon={faAngleDoubleLeft} />
            </Button>
            <Button href="{href}?page={currentPage - 1}" disabled={currentPage === 1}>
                <FaIcon icon={faAngleLeft} />
            </Button>
        </svelte:fragment>
        <Button
            class={currentPage === pageNumber ? "btn-active" : ""}
            href="{href}?page={pageNumber}"
        >
            {pageNumber}
        </Button>
        <svelte:fragment slot="after">
            <Button href="{href}?page={currentPage + 1}" disabled={currentPage === pageCount}>
                <FaIcon icon={faAngleRight} />
            </Button>
            <Button href="{href}?page={pageCount}" disabled={currentPage === pageCount}>
                <FaIcon icon={faAngleDoubleRight} />
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
