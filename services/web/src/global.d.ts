/// <reference types="@sveltejs/kit" />

declare namespace App {
    type User = import("$lib/types").User

    interface Locals {
        user: User | null
    }
}
