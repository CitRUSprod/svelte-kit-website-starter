<script lang="ts" module>
    import { defineMeta } from "@storybook/addon-svelte-csf"

    import Select from "./Select.svelte"

    import { disableControls } from "$lib/utils"

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { Story } = defineMeta({
        title: "UI/Select",
        component: Select,
        tags: ["autodocs"],
        argTypes: disableControls("class", "items", "onChange")
    })

    const basicItems = [
        { text: "First option", value: "option1" },
        { text: "Second option", value: "option2" },
        { text: "Third option", value: "option3" }
    ]

    const manyItems = [
        { text: "Russia", value: "ru" },
        { text: "USA", value: "us" },
        { text: "Germany", value: "de" },
        { text: "France", value: "fr" },
        { text: "United Kingdom", value: "gb" },
        { text: "Italy", value: "it" },
        { text: "Spain", value: "es" },
        { text: "Canada", value: "ca" },
        { text: "Australia", value: "au" },
        { text: "Japan", value: "jp" }
    ]

    const longTextItems = [
        { text: "Very long text that might not fit in the select", value: "long1" },
        { text: "Another long option with many characters", value: "long2" },
        { text: "Short", value: "short" }
    ]
</script>

<Story name="Default" args={{ items: basicItems }} />
<Story name="With selected value" args={{ items: basicItems, value: "option2" }} />
<Story name="With label" args={{ items: basicItems, label: "Select option" }} />
<Story
    name="With label and selected value"
    args={{ items: basicItems, label: "Country", value: "option1" }}
/>
<Story name="Disabled" args={{ items: basicItems, disabled: true, value: "option1" }} />
<Story
    name="With left icon"
    args={{
        items: basicItems,
        label: "Search",
        leftIconClass: "u:i-material-symbols-search"
    }}
/>
<Story
    name="With right icon"
    args={{
        items: basicItems,
        label: "Settings",
        rightIconClass: "u:i-material-symbols-settings"
    }}
/>
<Story
    name="With both icons"
    args={{
        items: basicItems,
        label: "Search settings",
        leftIconClass: "u:i-material-symbols-search",
        rightIconClass: "u:i-material-symbols-settings"
    }}
/>
<Story name="Many options" args={{ items: manyItems, label: "Select country" }} />
<Story
    name="Long text"
    args={{
        items: longTextItems,
        label: "Long options",
        value: "long1"
    }}
/>
<Story name="Empty list" args={{ items: [], label: "No options" }} />
<Story name="Different states" argTypes={disableControls("items", "label", "disabled")}>
    {#snippet template(props)}
        <div class="u:flex u:flex-col u:gap-4 u:max-w-xs">
            <div>
                <h3 class="u:mb-2">Normal</h3>
                <Select {...props} items={basicItems} label="Normal select" />
            </div>
            <div>
                <h3 class="u:mb-2">With selected value</h3>
                <Select {...props} items={basicItems} label="With selected" value="option2" />
            </div>
            <div>
                <h3 class="u:mb-2">Disabled</h3>
                <Select {...props} items={basicItems} label="Disabled" disabled value="option1" />
            </div>
            <div>
                <h3 class="u:mb-2">With icons</h3>
                <Select
                    {...props}
                    items={basicItems}
                    label="With icons"
                    leftIconClass="u:i-material-symbols-search"
                    rightIconClass="u:i-material-symbols-arrow-drop-down"
                />
            </div>
        </div>
    {/snippet}
</Story>
<Story name="In form" argTypes={disableControls("items", "label")}>
    {#snippet template(props)}
        <div class="u:max-w-md u:p-4 u:border u:rounded u:bg-default">
            <h3 class="u:mb-4">Registration</h3>
            <div class="u:flex u:flex-col u:gap-3">
                <Select
                    {...props}
                    items={[
                        { text: "Male", value: "male" },
                        { text: "Female", value: "female" },
                        { text: "Prefer not to say", value: "other" }
                    ]}
                    label="Gender"
                />
                <Select
                    {...props}
                    items={manyItems}
                    label="Country"
                    leftIconClass="u:i-material-symbols-public"
                />
                <Select
                    {...props}
                    items={[
                        { text: "18-25", value: "18-25" },
                        { text: "26-35", value: "26-35" },
                        { text: "36-45", value: "36-45" },
                        { text: "46+", value: "46+" }
                    ]}
                    label="Age"
                />
            </div>
        </div>
    {/snippet}
</Story>
<Story name="With custom styles" argTypes={disableControls("items", "label")}>
    {#snippet template(props)}
        <div class="u:flex u:flex-col u:gap-4 u:max-w-xs">
            <div>
                <h3 class="u:mb-2">With colored border</h3>
                <Select
                    {...props}
                    items={basicItems}
                    label="Colored border"
                    class="u:border-2 u:border-primary"
                />
            </div>
            <div>
                <h3 class="u:mb-2">Increased height</h3>
                <Select {...props} items={basicItems} label="Tall select" class="u:h-12" />
            </div>
            <div>
                <h3 class="u:mb-2">Rounded corners</h3>
                <Select {...props} items={basicItems} label="Rounded" class="u:rounded-xl" />
            </div>
        </div>
    {/snippet}
</Story>
