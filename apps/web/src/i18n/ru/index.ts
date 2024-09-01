import type { BaseTranslation } from "../i18n-types"

const ru = {
    actions: "Действия",
    add: "Добавить",
    assignRole: "Назначить роль",
    author: "Автор",
    avatar: "Аватар",
    avatarRemovedSuccessfully: "Аватар успешно удалён",
    avatarRemoving: "Удаление аватара",
    avatarRemovingQuestion: "Вы действительно хотите удалить ваш аватар?",
    avatarUpdatedSuccessfully: "Аватар успешно обновлён",
    ban: "Забанить",
    banAuthor: "Автор бана",
    banDate: "Дата бана",
    banned: "Забанен",
    banReason: "Причина бана",
    cancel: "Отмена",
    change: "Изменить",
    changeEmail: "Изменить электронную почту",
    changePassword: "Изменить пароль",
    chat: "Чат",
    clicks: "Клики",
    confirmationEmailSent: "Письмо с подтверждением было отправлено на ваш адрес электронной почты",
    confirmedEmail: "Подтверждённая электронная почта",
    content: "Содержание",
    count: "Количество",
    create: "Создать",
    created: "Создан",
    createPost: "Создать новый пост",
    createRole: "Создать роль",
    creationDateAsc: "Дата создания (Сначала старые)",
    creationDateDesc: "Дата создания (Сначала новые)",
    deleted: "Удалено",
    doLogin: "Войти",
    edit: "Редактировать",
    edited: "Отредактирован",
    email: "Электронная почта",
    emailChangeConfirmation: "Подтверждение смены электронной почты",
    emailChangeConfirmationSent:
        "Письмо с подтверждением было отправлено на ваш новый адрес электронной почты",
    emailChangedSuccessfully: "Электронная почта успешно изменена",
    emailChanging: "Изменение электронной почты",
    empty: "пусто",
    enterContent: "Введите содержание...",
    enterEmail: "Введите электронную почту...",
    enterNewPassword: "Введите новый пароль...",
    enterNewPasswordAgain: "Введите новый пароль снова...",
    enterReason: "Введите причину...",
    enterTitle: "Введите заголовок...",
    error: "Ошибка",
    errorOccurred: "Произошла ошибка",
    forgotPassword: "Забыли пароль?",
    goHome: "На главную",
    home: "Главная",
    info: "Информация",
    loggedInSuccessfully: "Вы успешно вошли",
    loggedOutSuccessfully: "Вы успешно вышли",
    login: "Вход",
    logout: "Выйти",
    message: "Сообщение",
    name: "Название",
    newPassword: "Новый пароль",
    newPasswordConfirmation: "Подтверждение нового пароля",
    no: "Нет",
    oldPassword: "Старый пароль",
    open: "Открыть",
    orLoginWith: "или войти с помощью",
    orRegisterWith: "или зарегистрироваться с помощью",
    password: "Пароль",
    passwordChangedSuccessfully: "Пароль успешно изменён",
    passwordChanging: "Изменение пароля",
    passwordConfirmation: "Подтверждение пароля",
    passwordReset: "Сброс пароля",
    passwordResetSuccessfully: "Пароль успешно сброшен",
    permission: "Разрешение",
    permissions: "Разрешения",
    postCreatedSuccessfully: "Пост успешно создан",
    postCreating: "Создание поста",
    postEditedSuccessfully: "Пост успешно отредактирован",
    postEditing: "Редактирование поста",
    postRemovedSuccessfully: "Пост успешно удалён",
    postRemoving: "Удаление поста",
    postRemovingQuestion: "Вы уверены, что хотите удалить этот пост?",
    posts: "Посты",
    profile: "Профиль",
    profileEditedSuccessfully: "Профиль успешно изменён",
    profileEditing: "Изменение профиля",
    randomNumber: "Случайное число",
    reason: "Причина",
    redirecting: "Перенаправляем...",
    register: "Зарегистрироваться",
    registeredSuccessfully: "Вы успешно зарегистрировались",
    registration: "Регистрация",
    registrationDate: "Дата регистрации",
    remove: "Удалить",
    removeAvatar: "Удалить аватар",
    removeUser: "Удалить аккаунт",
    reset: "Сбросить",
    resetLinkSent: "Ссылка на сброс была отправлена на ваш адрес электронной почты",
    role: "Роль",
    roleAssigning: "Назначение роли",
    roleCreatedSuccessfully: "Роль успешно создана",
    roleCreating: "Создание роли",
    roleEditedSuccessfully: "Роль успешно отредактирована",
    roleEditing: "Редактирование роли",
    roleRemovedSuccessfully: "Роль успешно удалена",
    roleRemoving: "Удаление роли",
    roleRemovingQuestion: "Вы уверены, что хотите удалить роль <b>{{role}}</b>?",
    roles: "Роли",
    save: "Сохранить",
    search: "Поиск",
    send: "Отправить",
    sendResetLink: "Отправить ссылку на сброс",
    simpleLayout: "Простой лэйаут",
    sorting: "Сортировка",
    success: "Успех",
    title: "Заголовок",
    titleAsc: "Заголовок (А-Я)",
    titleDesc: "Заголовок (Я-А)",
    unban: "Разбанить",
    uploadAvatar: "Загрузить аватар",
    user: "Пользователь",
    userBannedSuccessfully: "Пользователь успешно забанен",
    userBanning: "Бан пользователя",
    username: "Имя пользователя",
    userRemovedSuccessfully: "Аккаунт успешно удалён",
    userRemoving: "Удаление аккаунта",
    userRemovingConfirmation: "Для подтверждения напишите ваше имя пользователя.",
    userRemovingQuestion:
        "Вы действительно хотите удалить этот аккаунт без возможности восстановления?",
    users: "Пользователи",
    userUnbannedSuccessfully: "Пользователь успешно разбанен",
    warning: "Предупреждение",
    who: "Кто",
    yes: "Да"
} satisfies BaseTranslation

export default ru
