export enum TokenTtl {
    OAuthRegistration = 60 * 60,
    Access = 15 * 60,
    Refresh = 30 * 24 * 60 * 60,
    EmailConfirmation = 24 * 60 * 60,
    PasswordReset = 24 * 60 * 60
}
