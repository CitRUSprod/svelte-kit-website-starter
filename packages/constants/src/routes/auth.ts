export const base = "/auth"

export const register = `${base}/register`
export const oAuthRegister = `${base}/register/:oAuthRegistrationToken`
export const login = `${base}/login`
export const oAuthLogin = `${base}/login/:provider`
export const oAuthLoginCallback = `${base}/login/:provider/callback`
export const logout = `${base}/logout`
export const refreshTokens = `${base}/refresh`
