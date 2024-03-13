import type { Translation } from "../i18n-types"

const en = {
    $auth: {
        userWithSuchEmailAlreadyExists: "User with such email already exists",
        userWithSuchUsernameAlreadyExists: "User with such username already exists",
        emailAlreadySent: "Email has already been sent, check your email",
        registration: "Registration",
        dear: "Dear",
        completeRegistration: "Complete registration",
        registrationTokenExpired: "Registration token expired",
        oAuthRegistrationTokenNotFound: "OAuth registration token not found",
        unexpectedError: "Unexpected error",
        userWithEmailNotFound: "User with such email was not found",
        incorrectPassword: "Incorrect password",
        statesDoNotMatch: "States do not match",
        refreshTokenNotFound: "Refresh token not found"
    },
    $posts: {
        noAccess: "No access"
    },
    $profile: {
        userWithSuchUsernameAlreadyExists: "User with such username already exists",
        fileIsNotImage: "File is not an image",
        youDoNotHaveAvatar: "You do not have an avatar",
        emailIsNotSet: "Email is not set",
        oldAndNewEmailsMatch: "Old and new emails match",
        emailUpdate: "Email update",
        dear: "Dear",
        updateEmailTo: "Update email to <b>{email}</b>",
        emailUpdateTokenExpired: "Email update token expired",
        unexpectedError: "Unexpected error",
        updateEmail: "Update email",
        passwordIsNotSet: "Password is not set",
        oldAndNewPasswordsMatch: "Old and new passwords match",
        incorrectOldPassword: "Incorrect old password",
        userWithEmailNotFound: "User with such email was not found",
        passwordReset: "Password reset",
        resetPassword: "Reset password",
        passwordResetTokenExpired: "Password reset token expired"
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
