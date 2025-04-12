import type { Translation } from "../i18n-types"

const en = {
    accountAlreadyLinked: "This {provider}-account is already linked to another account",
    banned: "Banned",
    cannotUnlinkLastAuthMethod: "Cannot unlink the only way to sign in to your account",
    completeRegistration: "Complete registration",
    dear: "Dear",
    emailIsNotSet: "Email is not set",
    emailLinking: "Email linking",
    emailLinkingText: "To link your email to your account, please click the link below.",
    emailRegistrationText: "To complete registration, please click the link below.",
    emailResetPasswordText: "To reset your password, please click the link below.",
    emailUnlinking: "Email unlinking",
    emailUnlinkingText: "To unlink your email from your account, please click the link below.",
    emailUpdate: "Email update",
    emailUpdateText: "To confirm your email update, please click the link below.",
    emailUpdateTokenExpired: "Email update token expired",
    fileIsNotImage: "File is not an image",
    incorrectOldPassword: "Incorrect old password",
    incorrectPassword: "Incorrect password",
    linkEmail: "Link email",
    linkingTokenExpired: "Linking token expired",
    noAccess: "No access",
    oAuthRegistrationTokenNotFound: "OAuth registration token not found",
    oldAndNewEmailsMatch: "Old and new emails match",
    oldAndNewPasswordsMatch: "Old and new passwords match",
    passwordIsNotSet: "Password is not set",
    passwordReset: "Password reset",
    passwordResetTokenExpired: "Password reset token expired",
    postWithSuchIdWasNotFound: "Post with such ID was not found",
    refreshTokenNotFound: "Refresh token not found",
    registration: "Registration",
    registrationTokenExpired: "Registration token expired",
    resetPassword: "Reset password",
    roleWithSuchIdIsProtected: "Role with such ID is protected",
    roleWithSuchIdWasNotFound: "Role with such ID was not found",
    statesDoNotMatch: "States do not match",
    unexpectedError: "Unexpected error",
    unlinkEmail: "Unlink email",
    unlinkingTokenExpired: "Unlinking token expired",
    updateEmail: "Update email",
    updateEmailTo: "Update email to <b>{email}</b>",
    userDataFieldIsNotSet: "userData field is not set",
    userWithEmailNotFound: "User with such email was not found",
    userWithSuchEmailAlreadyExists: "User with such email already exists",
    userWithSuchIdIsAlready: 'User with such ID is already "{roleName}"',
    userWithSuchIdIsAlreadyBanned: "User with such ID is already banned",
    userWithSuchIdIsNotBanned: "User with such ID is not banned",
    userWithSuchIdWasNotFound: "User with such ID was not found",
    userWithSuchUsernameAlreadyExists: "User with such username already exists",
    youAlreadyHaveAccount: "Another {provider}-account is already linked to your account",
    youAlreadyHaveEmail: "You already have linked email",
    youDoNotHaveAccount: "There is no {provider}-account linked to your account",
    youDoNotHaveAvatar: "You do not have an avatar"
} satisfies Translation

export default en
