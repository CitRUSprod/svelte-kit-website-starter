<script lang="ts">
    import { Content, Button, TextField, Checkbox } from "$lib/components"

    import { crossfade } from "svelte/transition"
    import { browser } from "$app/environment"
    import { t } from "$lib/locales"

    const [send, receive] = crossfade({
        duration: 500,
        fallback(node) {
            const style = getComputedStyle(node)
            const transform = style.transform === "none" ? "" : style.transform

            return {
                duration: 300,
                css: value => `
                    transform: ${transform} scale(${value});
                    opacity: ${value};
                `
            }
        }
    })

    interface Task {
        id: number
        text: string
        completed: boolean
    }

    let tasks: Array<Task> = []

    if (browser) {
        tasks = JSON.parse(localStorage.getItem("tasks") ?? "[]")
    }

    $: if (browser) {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    $: completedTasks = tasks.filter(task => task.completed)
    $: incompleteTasks = tasks.filter(task => !task.completed)

    let taskText = ""

    $: trimmedTaskText = taskText.trim()

    function addTask() {
        if (trimmedTaskText) {
            tasks.push({
                id: Date.now(),
                text: trimmedTaskText,
                completed: false
            })
            tasks = tasks
            taskText = ""
        }
    }

    function addTaskOnEnter(e: KeyboardEvent) {
        if (e.key === "Enter") {
            addTask()
        }
    }

    function removeTask(id: number) {
        tasks = tasks.filter(task => task.id !== id)
    }
</script>

<svelte:head>
    <title>{$t("routes.todo.todo")}</title>
</svelte:head>

<Content.Default title={$t("routes.todo.todo")}>
    <div class="u:flex u:gap-2">
        <TextField
            class="u:flex-1"
            leftIconClass="u:i-ic-baseline-add-task"
            placeholder={$t("routes.todo.enter-task")}
            type="primary"
            bind:value={taskText}
            on:keypress={addTaskOnEnter}
        />
        <Button disabled={!trimmedTaskText} type="primary" on:click={addTask}>
            {$t("routes.todo.add")}
        </Button>
    </div>
    <div class="u:flex u:gap-4">
        <div class="u:flex-1">
            <h2>{$t("routes.todo.should-be-done")} ({incompleteTasks.length})</h2>
            <ul class="u:flex u:flex-col u:gap-2 u:mt-2">
                {#each incompleteTasks as task (task.id)}
                    <li
                        class="u:flex u:items-center u:gap-2 u:p-3 u:bg-content u:border-primary u:border u:rounded"
                        in:receive|local={{ key: task.id }}
                        out:send|local={{ key: task.id }}
                    >
                        <Checkbox type="primary" bind:checked={task.completed} />
                        <span class="u:flex-1">{task.text}</span>
                        <Button icon text type="error" on:click={() => removeTask(task.id)}>
                            <i class="u:i-ph-trash-bold u:text-xl" />
                        </Button>
                    </li>
                {/each}
            </ul>
        </div>
        <div class="u:flex-1">
            <h2>{$t("routes.todo.done")} ({completedTasks.length})</h2>
            <ul class="u:flex u:flex-col u:gap-2 u:mt-2">
                {#each completedTasks as task (task.id)}
                    <li
                        class="u:flex u:items-center u:gap-2 u:p-3 u:bg-content u:border-primary u:border u:rounded"
                        in:receive|local={{ key: task.id }}
                        out:send|local={{ key: task.id }}
                    >
                        <Checkbox type="primary" bind:checked={task.completed} />
                        <span class="u:flex-1 u:line-through">{task.text}</span>
                        <Button icon text type="error" on:click={() => removeTask(task.id)}>
                            <i class="u:i-ph-trash-bold u:text-xl" />
                        </Button>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</Content.Default>
