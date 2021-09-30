<script lang="ts" context="module">
    import type { ErrorLoad } from "@sveltejs/kit"

    export const load: ErrorLoad = ({ error, status }) => ({
        props: { error, status }
    })
</script>

<script lang="ts">
    import { Button } from "$lib/components"

    export let error: Error
    export let status: number
</script>

<svelte:head>
    <title>Error {status}</title>
</svelte:head>

<div class="flex justify-center items-center h-full">
    <div class="border-error rounded-lg border text-center p-8">
        <h1 class="text-4xl">Error {status}</h1>
        <h1 class="text-2xl">{error.message}</h1>
        <div class="flex justify-center mt-5">
            <Button
                class="btn-error btn-outline border-error text-error hover:bg-error hover:border-error"
                href="/"
            >
                Go Home
            </Button>
        </div>
    </div>
</div>
