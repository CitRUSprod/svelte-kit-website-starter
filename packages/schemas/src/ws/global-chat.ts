import { z } from "@repo/utils"

import * as common from "$/common"

export function $join() {
    return z.void()
}

export type $Join = z.infer<ReturnType<typeof $join>>

export function $leave() {
    return z.void()
}

export type $Leave = z.infer<ReturnType<typeof $leave>>

export function $sendMessage() {
    return common.chat.$rawMessage()
}

export type $SendMessage = z.infer<ReturnType<typeof $sendMessage>>

export function $receiveMessage() {
    return common.chat.$message()
}

export type $ReceiveMessage = z.infer<ReturnType<typeof $receiveMessage>>

export function $receiveHistory() {
    return z.array(common.chat.$message())
}

export type $ReceiveHistory = z.infer<ReturnType<typeof $receiveHistory>>
