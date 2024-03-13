import type { BaseTranslation } from "../i18n-types"

const ru = {
    $auth: {
        userWithSuchEmailAlreadyExists: "Пользователь с такой электронной почтой уже существует",
        userWithSuchUsernameAlreadyExists: "Пользователь с таким именем уже существует",
        emailAlreadySent: "Письмо уже отправлено, проверьте почту",
        registration: "Регистрация",
        dear: "Дорогой",
        completeRegistration: "Завершить регистрацию",
        registrationTokenExpired: "Срок действия токена регистрации истёк",
        oAuthRegistrationTokenNotFound: "Токен регистрации OAuth не найден",
        unexpectedError: "Неожиданная ошибка",
        userWithEmailNotFound: "Пользователь с таким адресом электронной почты не найден",
        incorrectPassword: "Неверный пароль",
        statesDoNotMatch: "State не совпадают",
        refreshTokenNotFound: "Refresh-токен не найден"
    },
    $posts: {
        noAccess: "Нет доступа"
    },
    $profile: {
        userWithSuchUsernameAlreadyExists: "Пользователь с таким именем уже существует",
        fileIsNotImage: "Файл не является изображением",
        youDoNotHaveAvatar: "У вас нет аватара",
        emailIsNotSet: "Электронная почта не указана",
        oldAndNewEmailsMatch: "Старая и новая электронные почты совпадают",
        emailUpdate: "Обновление электронной почты",
        dear: "Дорогой",
        updateEmailTo: "Обновить электронную почту на <b>{email}</b>",
        emailUpdateTokenExpired: "Срок действия токена обновления электронной почты истёк",
        unexpectedError: "Неожиданная ошибка",
        updateEmail: "Обновить почту",
        passwordIsNotSet: "Пароль не указан",
        oldAndNewPasswordsMatch: "Старый и новый пароли совпадают",
        incorrectOldPassword: "Неверный старый пароль",
        userWithEmailNotFound: "Пользователь с таким адресом электронной почты не найден",
        passwordReset: "Сброс пароля",
        resetPassword: "Сбросить пароль",
        passwordResetTokenExpired: "Срок действия токена сброса пароля истёк"
    },
    $roles: {
        roleWithSuchIdIsProtected: "Роль с таким ID защищена"
    },
    $users: {
        userWithSuchIdIsAlready: 'Пользователь с таким ID уже "{roleName}"',
        userWithSuchIdIsAlreadyBanned: "Пользователь с таким ID уже забанен",
        userWithSuchIdIsNotBanned: "Пользователь с таким ID не забанен"
    }
} satisfies BaseTranslation

export default ru
