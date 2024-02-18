export const base = "/auth"

export const register = `${base}/register`
export const completeRegistration = `${base}/register/complete/:registrationToken`
export const oAuthRegister = `${base}/register/oauth/:oAuthRegistrationToken`
export const login = `${base}/login`
export const oAuthLogin = `${base}/login/:provider`
export const oAuthLoginCallback = `${base}/login/:provider/callback`
export const logout = `${base}/logout`
export const refreshTokens = `${base}/refresh`
