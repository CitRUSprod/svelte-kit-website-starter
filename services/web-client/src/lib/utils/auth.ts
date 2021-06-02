import axios from "redaxios"
import { browser, dev } from "$app/env"

interface LoginData {
    token: string
}

export interface User {
    email: string
    username: string
    verified: string
}

let url = "/api"

if (!browser) {
    if (dev) {
        url = "http://localhost:6702"
    } else {
        url = "http://api:6702"
    }
}

export async function register(email: string, username: string, password: string) {
    await axios.post(`${url}/auth/register`, {
        email,
        username,
        password
    })
}

export async function login(email: string, password: string) {
    const { data } = await axios.post(`${url}/auth/login`, {
        email,
        password
    })

    return data as LoginData
}

export async function logout() {
    await axios.get(`${url}/auth/logout`)
}

export async function getUser(token: string) {
    const { data } = await axios.get(`${url}/auth/user`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return data as User
}

export async function sendVerificationEmail() {
    await axios.post(`${url}/auth/send-verification-email`)
}

export async function verifyEmail(token: string) {
    await axios.post(`${url}/auth/verify-email`, { token })
}
