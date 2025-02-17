import type { AxiosResponse } from "axios"
import { AxiosError } from "axios"
import { get } from "svelte/store"

import { ll } from "$i18n/helpers"
import { toasts } from "$lib/stores"

interface ApiError {
    statusCode: number
    error: string
    message: string
}

interface QueryOptions<T> {
    initialData?: T
    fn(this: void): Promise<AxiosResponse<T>>
    onSuccess?(this: void, data: T): void | Promise<void>
    onError?(this: void, error: ApiError): void | Promise<void>
    onUnexpectedError?(this: void, error: unknown): void | Promise<void>
}

export function useQuery<T>(options: QueryOptions<T>) {
    let data = $state(options.initialData)
    let error = $state()
    let loading = $state(false)

    async function refetch() {
        loading = true

        let res: AxiosResponse<T>
        let errorLocal: unknown

        try {
            res = await options.fn()
        } catch (err: unknown) {
            errorLocal = err
        }

        if (errorLocal) {
            console.error(errorLocal)

            data = undefined
            error = errorLocal
            loading = false

            if (
                errorLocal instanceof AxiosError &&
                typeof errorLocal.response?.data === "object" &&
                errorLocal.response.data !== null &&
                typeof errorLocal.response.data.message === "string"
            ) {
                options.onError ??= err => toasts.add("error", err.message)
                await options.onError(errorLocal.response.data)
            } else {
                options.onUnexpectedError ??= () => toasts.add("error", get(ll).errorOccurred())
                await options.onUnexpectedError(errorLocal)
            }
        } else {
            data = res!.data
            error = undefined
            loading = false

            if (options.onSuccess) {
                await options.onSuccess(res!.data)
            }
        }
    }

    return {
        get data() {
            return data
        },
        get error() {
            return error
        },
        get loading() {
            return loading
        },
        refetch
    }
}
