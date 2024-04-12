import type { BaseTranslation } from "../i18n-types"

const ru = {
    $auth: {
        completeRegistration: "Завершить регистрацию",
        dear: "Дорогой",
        emailAlreadySent: "Письмо уже отправлено, проверьте почту",
        incorrectPassword: "Неверный пароль",
        oAuthRegistrationTokenNotFound: "Токен регистрации OAuth не найден",
        refreshTokenNotFound: "Refresh-токен не найден",
        registration: "Регистрация",
        registrationTokenExpired: "Срок действия токена регистрации истёк",
        statesDoNotMatch: "State не совпадают",
        unexpectedError: "Неожиданная ошибка",
        userWithEmailNotFound: "Пользователь с таким адресом электронной почты не найден",
        userWithSuchEmailAlreadyExists: "Пользователь с такой электронной почтой уже существует",
        userWithSuchUsernameAlreadyExists: "Пользователь с таким именем уже существует"
    },
    $posts: {
        noAccess: "Нет доступа",
        unexpectedError: "Неожиданная ошибка"
    },
    $profile: {
        dear: "Дорогой",
        emailIsNotSet: "Электронная почта не указана",
        emailUpdate: "Обновление электронной почты",
        emailUpdateTokenExpired: "Срок действия токена обновления электронной почты истёк",
        fileIsNotImage: "Файл не является изображением",
        incorrectOldPassword: "Неверный старый пароль",
        oldAndNewEmailsMatch: "Старая и новая электронные почты совпадают",
        oldAndNewPasswordsMatch: "Старый и новый пароли совпадают",
        passwordIsNotSet: "Пароль не указан",
        passwordReset: "Сброс пароля",
        passwordResetTokenExpired: "Срок действия токена сброса пароля истёк",
        resetPassword: "Сбросить пароль",
        unexpectedError: "Неожиданная ошибка",
        updateEmail: "Обновить почту",
        updateEmailTo: "Обновить электронную почту на <b>{email}</b>",
        userWithEmailNotFound: "Пользователь с таким адресом электронной почты не найден",
        userWithSuchUsernameAlreadyExists: "Пользователь с таким именем уже существует",
        youDoNotHaveAvatar: "У вас нет аватара"
    },
    $roles: {
        roleWithSuchIdIsProtected: "Роль с таким ID защищена"
    },
    $users: {
        unexpectedError: "Неожиданная ошибка",
        userWithSuchIdIsAlready: 'Пользователь с таким ID уже "{roleName}"',
        userWithSuchIdIsAlreadyBanned: "Пользователь с таким ID уже забанен",
        userWithSuchIdIsNotBanned: "Пользователь с таким ID не забанен"
    }
} satisfies BaseTranslation

export default ru
