import axios from "$lib/utils/axios"

interface LoginData {
    token: string
}

export namespace Auth {
    export interface User {
        email: string
        username: string
    }

    export async function register(email: string, username: string, password: string) {
        await axios.post("/api/auth/register", {
            email,
            username,
            password
        })
    }

    export async function login(email: string, password: string) {
        const { data } = await axios.post<LoginData>("/api/auth/login", {
            email,
            password
        })

        return data
    }

    export async function logout() {
        await axios.get("/api/auth/logout")
    }

    export async function getUser(token: string) {
        const { data } = await axios.get<User>("/api/auth/user", {
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        return data
    }
}
