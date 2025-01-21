import * as schemasModels from "@local/schemas/models"
import { writable } from "svelte/store"

export const userData = writable<schemasModels.user.User | null>(null)
