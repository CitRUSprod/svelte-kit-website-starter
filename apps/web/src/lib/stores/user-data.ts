import * as schemasModels from "@repo/schemas/models"
import { writable } from "svelte/store"

export const userData = writable<schemasModels.user.User | null>(null)
