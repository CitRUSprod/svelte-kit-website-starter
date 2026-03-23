<script lang="ts" module>
    import { defineMeta } from "@storybook/addon-svelte-csf"

    import Pagination from "./Pagination.svelte"

    import { disableControls } from "$lib/utils"

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { Story } = defineMeta({
        title: "UI/Pagination",
        component: Pagination,
        tags: ["autodocs"],
        argTypes: disableControls("class", "onSetPage")
    })
</script>

<Story name="Default" args={{ page: 1, pages: 10 }} />
<Story name="Different states" argTypes={disableControls("page", "pages")}>
    {#snippet template(props)}
        <div class="u:flex u:flex-col u:gap-6">
            <div>
                <h3 class="u:mb-2">First page (1 of 5)</h3>
                <Pagination {...props} page={1} pages={5} />
            </div>
            <div>
                <h3 class="u:mb-2">Middle page (3 of 10)</h3>
                <Pagination {...props} page={3} pages={10} />
            </div>
            <div>
                <h3 class="u:mb-2">Last page (20 of 20)</h3>
                <Pagination {...props} page={20} pages={20} />
            </div>
            <div>
                <h3 class="u:mb-2">Single page</h3>
                <Pagination {...props} page={1} pages={1} />
            </div>
            <div>
                <h3 class="u:mb-2">Many pages (15 of 100)</h3>
                <Pagination {...props} page={15} pages={100} />
            </div>
        </div>
    {/snippet}
</Story>
<Story name="With loading" argTypes={disableControls("loading")}>
    {#snippet template(props)}
        <div class="u:flex u:flex-col u:gap-4">
            <div>
                <h3 class="u:mb-2">Normal state</h3>
                <Pagination {...props} page={5} pages={10} loading={false} />
            </div>
            <div>
                <h3 class="u:mb-2">Loading state</h3>
                <Pagination {...props} page={5} pages={10} loading={true} />
            </div>
        </div>
    {/snippet}
</Story>
<Story name="Interactive" argTypes={disableControls("page", "pages", "onSetPage")}>
    {#snippet template(props)}
        <div class="u:flex u:flex-col u:gap-4">
            <div>
                <p class="u:text-sm u:mb-2">
                    Current page: <strong>5</strong> of <strong>15</strong>
                </p>
                <Pagination
                    {...props}
                    page={5}
                    pages={15}
                    onSetPage={newPage => {
                        console.log("Navigate to page:", newPage)
                    }}
                />
            </div>
            <div class="u:text-xs u:text-gray-600">
                Open browser console to see logs when switching pages
            </div>
        </div>
    {/snippet}
</Story>
<Story name="Edge cases" argTypes={disableControls("page", "pages")}>
    {#snippet template(props)}
        <div class="u:flex u:flex-col u:gap-6">
            <div>
                <h3 class="u:mb-2">Two pages (1 of 2)</h3>
                <Pagination {...props} page={1} pages={2} />
            </div>
            <div>
                <h3 class="u:mb-2">Two pages (2 of 2)</h3>
                <Pagination {...props} page={2} pages={2} />
            </div>
            <div>
                <h3 class="u:mb-2">Three pages (2 of 3)</h3>
                <Pagination {...props} page={2} pages={3} />
            </div>
            <div>
                <h3 class="u:mb-2">Very many pages (50 of 1000)</h3>
                <Pagination {...props} page={50} pages={1000} />
            </div>
        </div>
    {/snippet}
</Story>
<Story name="With custom styles">
    {#snippet template(props)}
        <div class="u:flex u:flex-col u:gap-4">
            <div>
                <h3 class="u:mb-2">Pagination with padding</h3>
                <Pagination {...props} class="u:p-4 u:bg-gray-400 u:rounded" page={3} pages={8} />
            </div>
            <div>
                <h3 class="u:mb-2">Pagination with large gaps</h3>
                <Pagination {...props} class="u:gap-3" page={5} pages={12} />
            </div>
        </div>
    {/snippet}
</Story>
