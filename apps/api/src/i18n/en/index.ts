import type { Translation } from "../i18n-types"

const en = {
    $auth: {
        completeRegistration: "Complete registration",
        dear: "Dear",
        emailAlreadySent: "Email has already been sent, check your email",
        incorrectPassword: "Incorrect password",
        oAuthRegistrationTokenNotFound: "OAuth registration token not found",
        refreshTokenNotFound: "Refresh token not found",
        registration: "Registration",
        registrationTokenExpired: "Registration token expired",
        statesDoNotMatch: "States do not match",
        unexpectedError: "Unexpected error",
        userWithEmailNotFound: "User with such email was not found",
        userWithSuchEmailAlreadyExists: "User with such email already exists",
        userWithSuchUsernameAlreadyExists: "User with such username already exists"
    },
    $posts: {
        noAccess: "No access"
    },
    $profile: {
        dear: "Dear",
        emailIsNotSet: "Email is not set",
        emailUpdate: "Email update",
        emailUpdateTokenExpired: "Email update token expired",
        fileIsNotImage: "File is not an image",
        incorrectOldPassword: "Incorrect old password",
        oldAndNewEmailsMatch: "Old and new emails match",
        oldAndNewPasswordsMatch: "Old and new passwords match",
        passwordIsNotSet: "Password is not set",
        passwordReset: "Password reset",
        passwordResetTokenExpired: "Password reset token expired",
        resetPassword: "Reset password",
        unexpectedError: "Unexpected error",
        updateEmail: "Update email",
        updateEmailTo: "Update email to <b>{email}</b>",
        userWithEmailNotFound: "User with such email was not found",
        userWithSuchUsernameAlreadyExists: "User with such username already exists",
        youDoNotHaveAvatar: "You do not have an avatar"
    },
    $roles: {
        roleWithSuchIdIsProtected: "Role with such ID is protected"
    },
    $users: {
        userWithSuchIdIsAlready: 'User with such ID is already "{roleName}"',
        userWithSuchIdIsAlreadyBanned: "User with such ID is already banned",
        userWithSuchIdIsNotBanned: "User with such ID is not banned"
    }
} satisfies Translation

export default en
