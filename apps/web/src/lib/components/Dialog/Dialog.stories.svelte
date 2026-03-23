<script lang="ts" module>
    import { defineMeta } from "@storybook/addon-svelte-csf"

    import { Button } from "../Button"
    import { TextField } from "../TextField"

    import Dialog from "./Dialog.svelte"

    import { disableControls } from "$lib/utils"

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { Story } = defineMeta({
        title: "UI/Dialog",
        component: Dialog,
        tags: ["autodocs"],
        argTypes: disableControls("class", "contentClass", "children")
    })

    const dialogs = $state({
        default: undefined as Dialog | undefined,
        withoutTitle: undefined as Dialog | undefined,
        persistent: undefined as Dialog | undefined,
        notClosable: undefined as Dialog | undefined,
        longContent: undefined as Dialog | undefined,
        withForm: undefined as Dialog | undefined,
        withCustomStyles: undefined as Dialog | undefined,
        confirmation: undefined as Dialog | undefined,
        nested: undefined as Dialog | undefined,
        nestedSecond: undefined as Dialog | undefined,
        nestedThird: undefined as Dialog | undefined
    })
</script>

<Story name="Default" args={{ title: "Title" }}>
    {#snippet template(props)}
        <Button onClick={dialogs.default?.open}>Open</Button>
        <Dialog bind:this={dialogs.default} {...props}>Content</Dialog>
    {/snippet}
</Story>
<Story name="Without title">
    {#snippet template(props)}
        <Button onClick={dialogs.withoutTitle?.open}>Open dialog without title</Button>
        <Dialog bind:this={dialogs.withoutTitle} {...props}>
            <p>Dialog without title. Content can be anything.</p>
        </Dialog>
    {/snippet}
</Story>
<Story name="Persistent" args={{ persistent: true, title: "Persistent dialog" }}>
    {#snippet template(props)}
        <Button onClick={dialogs.persistent?.open}>Open persistent dialog</Button>
        <Dialog bind:this={dialogs.persistent} {...props}>
            <p class="u:mb-4">
                This dialog cannot be closed by clicking outside or pressing Escape. Use the close
                button.
            </p>
            <Button onClick={dialogs.persistent?.close}>Close</Button>
        </Dialog>
    {/snippet}
</Story>
<Story name="Without close button" args={{ closable: false, title: "Dialog without close button" }}>
    {#snippet template(props)}
        <Button onClick={dialogs.notClosable?.open}>Open</Button>
        <Dialog bind:this={dialogs.notClosable} {...props}>
            <p class="u:mb-4">Dialog without close button in the header.</p>
            <div class="u:flex u:gap-2">
                <Button variant="primary" onClick={dialogs.notClosable?.close}>Confirm</Button>
                <Button variant="error" onClick={dialogs.notClosable?.close}>Cancel</Button>
            </div>
        </Dialog>
    {/snippet}
</Story>
<Story name="Long content" args={{ title: "Dialog with long content" }}>
    {#snippet template(props)}
        <Button onClick={dialogs.longContent?.open}>Open</Button>
        <Dialog bind:this={dialogs.longContent} {...props}>
            <div class="u:space-y-4">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                    veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
                    quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
                <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                    adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
                    dolore magnam aliquam quaerat voluptatem.
                </p>
            </div>
        </Dialog>
    {/snippet}
</Story>
<Story name="With form" args={{ title: "Edit profile" }}>
    {#snippet template(props)}
        <Button onClick={dialogs.withForm?.open}>Edit profile</Button>
        <Dialog bind:this={dialogs.withForm} {...props}>
            <div class="u:space-y-4">
                <div class="u:mb-4">
                    <h3 class="u:font-bold">Ivan Petrov</h3>
                    <p class="u:text-sm">@ivan_petrov</p>
                </div>
                <TextField label="First name" value="Ivan" />
                <TextField label="Last name" value="Petrov" />
                <TextField label="Email" value="ivan@example.com" />
                <TextField label="About" value="Developer from Moscow" />
                <div class="u:flex u:gap-2 u:pt-4">
                    <Button variant="primary" onClick={dialogs.withForm?.close}>Save</Button>
                    <Button variant="error" onClick={dialogs.withForm?.close}>Cancel</Button>
                </div>
            </div>
        </Dialog>
    {/snippet}
</Story>
<Story name="Confirmation dialog" args={{ title: "Confirm action", closable: false }}>
    {#snippet template(props)}
        <Button variant="error" onClick={dialogs.confirmation?.open}>Delete account</Button>
        <Dialog bind:this={dialogs.confirmation} {...props}>
            <div class="u:space-y-4">
                <p>Are you sure you want to delete your account?</p>
                <p class="u:text-sm u:text-gray-600">
                    This action cannot be undone. All your data will be permanently deleted.
                </p>
                <div class="u:flex u:gap-2 u:pt-2">
                    <Button variant="error" onClick={dialogs.confirmation?.close}>
                        Yes, delete
                    </Button>
                    <Button variant="error" onClick={dialogs.confirmation?.close}>Cancel</Button>
                </div>
            </div>
        </Dialog>
    {/snippet}
</Story>
<Story name="With custom styles">
    {#snippet template(props)}
        <div class="u:flex u:gap-2">
            <Button onClick={() => dialogs.withCustomStyles?.open()}>Open styled dialog</Button>
        </div>
        <Dialog
            bind:this={dialogs.withCustomStyles}
            {...props}
            title="Styled dialog"
            class="u:border-2 u:border-primary u:shadow-lg"
            contentClass="u:bg-gray-400 u:p-4 u:rounded"
        >
            <div class="u:text-center">
                <h3 class="u:text-lg u:font-bold u:mb-2 u:text-primary">Special dialog</h3>
                <p class="u:mb-4">Dialog with custom styles and styling.</p>
                <Button variant="primary" onClick={dialogs.withCustomStyles?.close}>Got it</Button>
            </div>
        </Dialog>
    {/snippet}
</Story>
<Story name="Nested dialogs" args={{ title: "First dialog" }}>
    {#snippet template(props)}
        <Button onClick={dialogs.nested?.open}>Open first dialog</Button>
        <Dialog bind:this={dialogs.nested} {...props}>
            <div class="u:space-y-4">
                <p>This is the first dialog. From it you can open the second dialog.</p>
                <div class="u:flex u:gap-2">
                    <Button variant="primary" onClick={dialogs.nestedSecond?.open}>
                        Open second dialog
                    </Button>
                    <Button variant="default" onClick={dialogs.nested?.close}>Close</Button>
                </div>
            </div>
        </Dialog>
        <Dialog bind:this={dialogs.nestedSecond} title="Second dialog">
            <div class="u:space-y-4">
                <p>This is the second dialog, opened on top of the first.</p>
                <p class="u:text-sm u:text-gray-600">
                    Note that the first dialog remains open in the background.
                </p>
                <div class="u:flex u:gap-2">
                    <Button variant="info" onClick={dialogs.nestedThird?.open}>
                        Open third dialog
                    </Button>
                    <Button variant="default" onClick={dialogs.nestedSecond?.close}>Close</Button>
                </div>
            </div>
        </Dialog>
        <Dialog bind:this={dialogs.nestedThird} title="Third dialog" persistent>
            <div class="u:space-y-4">
                <p>This is the third dialog - the topmost in the stack.</p>
                <p class="u:text-sm u:text-gray-600">
                    This dialog is configured as persistent, so it can only be closed with the
                    button.
                </p>
                <div class="u:bg-yellow-100 u:p-3 u:rounded u:text-sm">
                    <strong>Tip:</strong> When working with nested dialogs, it's recommended to limit
                    their number for better user experience.
                </div>
                <div class="u:flex u:gap-2">
                    <Button variant="success" onClick={dialogs.nestedThird?.close}>
                        Close third dialog
                    </Button>
                    <Button
                        variant="warning"
                        onClick={() => {
                            dialogs.nestedThird?.close()
                            dialogs.nestedSecond?.close()
                            dialogs.nested?.close()
                        }}
                    >
                        Close all dialogs
                    </Button>
                </div>
            </div>
        </Dialog>
    {/snippet}
</Story>
