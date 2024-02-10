export const base = "/auth"

export const register = `${base}/register`
export const oAuthRegister = `${base}/register/:oAuthRegistrationToken`
export const login = `${base}/login`
export const loginWithTwitch = `${base}/login/twitch`
export const loginWithTwitchCallback = `${base}/login/twitch/callback`
export const logout = `${base}/logout`
export const refreshTokens = `${base}/refresh`
