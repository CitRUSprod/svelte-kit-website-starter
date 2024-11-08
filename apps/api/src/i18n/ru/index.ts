import type { BaseTranslation } from "../i18n-types"

const ru = {
    accountAlreadyLinked: "Этот {provider}-аккаунт уже привязан к другому аккаунту",
    banned: "Забанен",
    completeRegistration: "Завершить регистрацию",
    dear: "Дорогой",
    emailAlreadySent: "Письмо уже отправлено, проверьте почту",
    emailIsNotSet: "Электронная почта не указана",
    emailUpdate: "Обновление электронной почты",
    emailUpdateTokenExpired: "Срок действия токена обновления электронной почты истёк",
    fileIsNotImage: "Файл не является изображением",
    incorrectOldPassword: "Неверный старый пароль",
    incorrectPassword: "Неверный пароль",
    noAccess: "Нет доступа",
    oAuthRegistrationTokenNotFound: "Токен регистрации OAuth не найден",
    oldAndNewEmailsMatch: "Старая и новая электронные почты совпадают",
    oldAndNewPasswordsMatch: "Старый и новый пароли совпадают",
    passwordIsNotSet: "Пароль не указан",
    passwordReset: "Сброс пароля",
    passwordResetTokenExpired: "Срок действия токена сброса пароля истёк",
    postWithSuchIdWasNotFound: "Пост с таким ID не найден",
    refreshTokenNotFound: "Refresh-токен не найден",
    registration: "Регистрация",
    registrationTokenExpired: "Срок действия токена регистрации истёк",
    resetPassword: "Сбросить пароль",
    roleWithSuchIdIsProtected: "Роль с таким ID защищена",
    roleWithSuchIdWasNotFound: "Роль с таким ID не найдена",
    statesDoNotMatch: "State не совпадают",
    unexpectedError: "Неожиданная ошибка",
    updateEmail: "Обновить почту",
    updateEmailTo: "Обновить электронную почту на <b>{email}</b>",
    userDataFieldIsNotSet: "Поле userData не установлено",
    userWithEmailNotFound: "Пользователь с таким адресом электронной почты не найден",
    userWithSuchEmailAlreadyExists: "Пользователь с такой электронной почтой уже существует",
    userWithSuchIdIsAlready: 'Пользователь с таким ID уже "{roleName}"',
    userWithSuchIdIsAlreadyBanned: "Пользователь с таким ID уже забанен",
    userWithSuchIdIsNotBanned: "Пользователь с таким ID не забанен",
    userWithSuchIdWasNotFound: "Пользователь с таким ID не найден",
    userWithSuchUsernameAlreadyExists: "Пользователь с таким именем уже существует",
    youAlreadyHaveAccount: "К вашему аккаунту уже привязан другой {provider}-аккаунт",
    youDoNotHaveAccount: "К вашему аккаунту не привязан {provider}-аккаунт",
    youDoNotHaveAvatar: "У вас нет аватара"
} satisfies BaseTranslation

export default ru
