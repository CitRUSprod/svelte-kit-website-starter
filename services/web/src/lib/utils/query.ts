import { AxiosError, type AxiosResponse } from "axios"
import { writable, get } from "svelte/store"
import { t } from "$lib/locales"
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

type QueryControllerParams = Record<string, unknown>

interface QueryControllerOptions<T, K extends QueryControllerParams | undefined> {
    initialData?: T
    params?: K
    fn: K extends undefined
        ? (this: void) => Promise<AxiosResponse<T>>
        : (this: void, params: K) => Promise<AxiosResponse<T>>
    onSuccess?(this: void, data: T): void | Promise<void>
    onError?(this: void, error: ApiError): void | Promise<void>
    onUnexpectedError?(this: void, error: unknown): void | Promise<void>
}

export function createQueryController<T, K extends QueryControllerParams | undefined = undefined>(
    options: QueryControllerOptions<T, K>
) {
    const { subscribe, update } = writable<QueryControllerStoreData<T>>({
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
            res = await options.fn(options.params as any)
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
                options.onUnexpectedError ??= () =>
                    toasts.add("error", get(t)("global.error-occurred"))
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
        ...(options.params ? { params: options.params } : {}),
        refresh
    }

    return queryController as K extends undefined
        ? Omit<typeof queryController, "params">
        : Required<typeof queryController>
}
