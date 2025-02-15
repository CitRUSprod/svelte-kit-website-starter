import type { AxiosResponse } from "axios"
import { AxiosError } from "axios"
import { writable, get } from "svelte/store"

import { ll } from "$i18n/helpers"
import { toasts } from "$lib/stores"

interface ApiError {
    statusCode: number
    error: string
    message: string
}

interface QueryControllerStoreData<T> {
    data: T | undefined
    error: unknown
    loading: boolean
}

interface QueryControllerOptions<T> {
    initialData?: T
    fn(this: void): Promise<AxiosResponse<T>>
    onSuccess?(this: void, data: T): void | Promise<void>
    onError?(this: void, error: ApiError): void | Promise<void>
    onUnexpectedError?(this: void, error: unknown): void | Promise<void>
}

export function createQueryController<T>(options: QueryControllerOptions<T>) {
    const { subscribe, update, set } = writable<QueryControllerStoreData<T>>({
        data: options.initialData,
        error: undefined,
        loading: false
    })

    async function refresh() {
        update(q => {
            q.loading = true
            return q
        })

        let res: AxiosResponse<T>
        let err: unknown

        try {
            res = await options.fn()
        } catch (error: unknown) {
            err = error
        }

        if (err) {
            console.error(err)

            update(q => {
                q.data = undefined
                q.error = err
                q.loading = false
                return q
            })

            if (
                err instanceof AxiosError &&
                typeof err.response?.data === "object" &&
                err.response.data !== null &&
                typeof err.response.data.message === "string"
            ) {
                options.onError ??= error => toasts.add("error", error.message)
                await options.onError(err.response.data)
            } else {
                options.onUnexpectedError ??= () => toasts.add("error", get(ll).errorOccurred())
                await options.onUnexpectedError(err)
            }
        } else {
            update(q => {
                q.data = res.data
                q.error = undefined
                q.loading = false
                return q
            })

            if (options.onSuccess) {
                await options.onSuccess(res!.data)
            }
        }
    }

    const queryController = {
        subscribe,
        update,
        set,
        refresh
    }

    return queryController as Required<typeof queryController>
}
