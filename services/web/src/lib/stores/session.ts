import { session as s } from "$app/stores"

import type { Writable } from "svelte/store"
import type { Session } from "$lib/types"

export const session = s as Writable<Session>
