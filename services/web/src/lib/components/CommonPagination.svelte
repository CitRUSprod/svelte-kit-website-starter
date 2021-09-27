<script lang="ts">
    import FaIcon from "svelte-fa"
    import Button from "./Button.svelte"
    import Pagination from "./Pagination.svelte"

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
</script>

<Pagination class="btn-group justify-center" {currentPage} {pageCount} {length} let:pageNumber>
    <svelte:fragment slot="before">
        <Button href="{href}?page=1" disabled={currentPage === 1}>
            <FaIcon icon={faAngleDoubleLeft} />
        </Button>
        <Button href="{href}?page={currentPage - 1}" disabled={currentPage === 1}>
            <FaIcon icon={faAngleLeft} />
        </Button>
    </svelte:fragment>
    <Button class={currentPage === pageNumber ? "btn-active" : ""} href="{href}?page={pageNumber}">
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
