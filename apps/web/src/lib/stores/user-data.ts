import { writable } from "svelte/store"
import * as schemasModels from "@local/schemas/models"

export const userData = writable<schemasModels.user.User | null>(null)
