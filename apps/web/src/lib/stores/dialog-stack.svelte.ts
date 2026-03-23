export type DialogId = symbol

let dialogStackLocal = $state<Array<DialogId>>([])
let activeId = $state<DialogId | null>(null)

function registerDialog() {
    const id = Symbol("dialog-id")
    return id
}

function pushDialog(id: DialogId) {
    const newStack = dialogStackLocal.filter(dialogId => dialogId !== id)
    newStack.push(id)
    dialogStackLocal = newStack
    activeId = id
}

function popDialog() {
    const newStack = dialogStackLocal.slice(0, -1)
    const topDialogId = newStack.length > 0 ? newStack[newStack.length - 1]! : null
    dialogStackLocal = newStack
    activeId = topDialogId
    return newStack.length > 0
}

export const dialogStack = {
    get activeDialogId() {
        return activeId
    },
    registerDialog,
    pushDialog,
    popDialog
}
