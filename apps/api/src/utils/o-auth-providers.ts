import { Twitch } from "arctic"

import { env } from "$/constants"

export const twitch = env.PUBLIC_ENABLE_TWITCH_AUTH
    ? new Twitch(
          env.TWITCH_CLIENT_ID!,
          env.TWITCH_CLIENT_SECRET!,
          new URL("/auth/login/twitch/callback", env.PUBLIC_BASE_URL).toString()
      )
    : null
