import { Twitch } from "arctic"

import { env } from "$/constants"

export const twitch = new Twitch(
    env.TWITCH_CLIENT_ID,
    env.TWITCH_CLIENT_SECRET,
    new URL("/auth/login/twitch/callback", env.PUBLIC_BASE_URL).toString()
)
