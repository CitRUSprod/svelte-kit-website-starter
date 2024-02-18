<script lang="ts">
    import { Content } from "$lib/components"

    import { browser } from "$app/environment"
    import { goto } from "$app/navigation"
    import { localePath } from "$lib/locales"
    import { toasts } from "$lib/stores"

    if (browser) {
        toasts.add(
            "success",
            "Письмо с подтверждением было отправлено на ваш новый адрес электронной почты"
        )
        goto($localePath("/"), {
            replaceState: true,
            invalidateAll: true
        })
    }
</script>

<svelte:head>
    <title>Подтверждение смены электронной почты</title>
</svelte:head>

<Content.Default title="Перенаправляем..." />
