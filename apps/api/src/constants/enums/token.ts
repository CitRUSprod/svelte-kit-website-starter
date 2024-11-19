export enum TokenTtl {
    Registration = 60 * 60,
    OAuthRegistration = 60 * 60,
    Linking = 60 * 60,
    Unlinking = 60 * 60,
    Access = 15 * 60,
    Refresh = 30 * 24 * 60 * 60,
    EmailUpdate = 60 * 60,
    PasswordReset = 60 * 60
}
