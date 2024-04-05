import type { BaseTranslation } from "../i18n-types"

const ru = {
    $: {
        $$header: {
            chat: "Чат",
            login: "Войти",
            logout: "Выйти",
            posts: "Посты",
            profile: "Профиль",
            roles: "Роли",
            simpleLayout: "Простой лэйаут",
            users: "Пользователи"
        },
        $auth: {
            $login: {
                $_provider: {
                    $callback: {
                        loggedInSuccessfully: "Вы успешно вошли",
                        login: "Вход",
                        redirecting: "Перенаправляем..."
                    }
                },
                doLogin: "Войти",
                email: "Электронная почта",
                forgotPassword: "Забыли пароль?",
                loggedInSuccessfully: "Вы успешно вошли",
                login: "Вход",
                orLoginWith: "или войти с помощью",
                password: "Пароль",
                registration: "Регистрация"
            },
            $logout: {
                loggedOutSuccessfully: "Вы успешно вышли",
                logout: "Выход",
                redirecting: "Перенаправляем..."
            },
            $registration: {
                $complete: {
                    $_token: {
                        redirecting: "Перенаправляем...",
                        registeredSuccessfully: "Вы успешно зарегистрировались",
                        registration: "Регистрация"
                    }
                },
                $oauth: {
                    $_token: {
                        register: "Зарегистрироваться",
                        registeredSuccessfully: "Вы успешно зарегистрировались",
                        registration: "Регистрация",
                        username: "Имя пользователя"
                    }
                },
                confirmationEmailSent:
                    "Письмо с подтверждением было отправлено на ваш адрес электронной почты",
                email: "Электронная почта",
                login: "Вход",
                orRegisterWith: "или зарегистрироваться с помощью",
                password: "Пароль",
                passwordConfirmation: "Подтверждение пароля",
                register: "Зарегистрироваться",
                registration: "Регистрация",
                username: "Имя пользователя"
            }
        },
        $chat: {
            chat: "Чат"
        },
        $error: {
            error: "Ошибка",
            goHome: "На главную"
        },
        $posts: {
            $$dialogPostCreating: {
                cancel: "Отмена",
                content: "Содержание",
                create: "Создать",
                enterContent: "Введите содержание...",
                enterTitle: "Введите заголовок...",
                postCreatedSuccessfully: "Пост успешно создан",
                postCreating: "Создание поста",
                title: "Заголовок"
            },
            $_id: {
                $$dialogPostEditing: {
                    cancel: "Отмена",
                    content: "Содержание",
                    enterContent: "Введите содержание...",
                    enterTitle: "Введите заголовок...",
                    postEditedSuccessfully: "Пост успешно отредактирован",
                    postEditing: "Редактирование поста",
                    save: "Сохранить",
                    title: "Заголовок"
                },
                $$dialogPostRemoving: {
                    cancel: "Отмена",
                    postRemovedSuccessfully: "Пост успешно удалён",
                    postRemoving: "Удаление поста",
                    postRemovingQuestion: "Вы уверены, что хотите удалить этот пост?",
                    remove: "Удалить"
                },
                author: "Автор",
                created: "Создан",
                edit: "Редактировать",
                edited: "Отредактирован",
                remove: "Удалить"
            },
            author: "Автор",
            createPost: "Создать новый пост",
            creationDateAsc: "Дата создания (Сначала старые)",
            creationDateDesc: "Дата создания (Сначала новые)",
            enterTitle: "Введите заголовок...",
            posts: "Посты",
            search: "Поиск",
            sorting: "Сортировка",
            titleAsc: "Заголовок (А-Я)",
            titleDesc: "Заголовок (Я-А)"
        },
        $profile: {
            $email: {
                $from: {
                    $_token: {
                        emailChangeConfirmation: "Подтверждение смены электронной почты",
                        emailChangeConfirmationSent:
                            "Письмо с подтверждением было отправлено на ваш новый адрес электронной почты",
                        redirecting: "Перенаправляем..."
                    }
                },
                $to: {
                    $_token: {
                        emailChangeConfirmation: "Подтверждение смены электронной почты",
                        emailChangedSuccessfully: "Электронная почта успешно изменена",
                        redirecting: "Перенаправляем..."
                    }
                }
            },
            $password: {
                $_token: {
                    enterNewPassword: "Введите новый пароль...",
                    enterNewPasswordAgain: "Введите новый пароль снова...",
                    newPassword: "Новый пароль",
                    newPasswordConfirmation: "Подтверждение нового пароля",
                    passwordReset: "Сброс пароля",
                    passwordResetSuccessfully: "Пароль успешно сброшен",
                    reset: "Сбросить"
                },
                email: "Электронная почта",
                enterEmail: "Введите электронную почту...",
                passwordReset: "Сброс пароля",
                resetLinkSent: "Ссылка на сброс была отправлена на ваш адрес электронной почты",
                sendResetLink: "Отправить ссылку на сброс"
            }
        },
        $roles: {
            $$dialogRoleCreating: {
                add: "Добавить",
                cancel: "Отмена",
                create: "Создать",
                empty: "пусто",
                name: "Название",
                permission: "Разрешение",
                permissions: "Разрешения",
                roleCreatedSuccessfully: "Роль успешно создана",
                roleCreating: "Создание роли"
            },
            $$dialogRoleEditing: {
                add: "Добавить",
                cancel: "Отмена",
                empty: "пусто",
                name: "Название",
                permission: "Разрешение",
                permissions: "Разрешения",
                roleEditedSuccessfully: "Роль успешно отредактирована",
                roleEditing: "Редактирование роли",
                save: "Сохранить"
            },
            $$dialogRoleRemoving: {
                cancel: "Отмена",
                remove: "Удалить",
                roleRemovedSuccessfully: "Роль успешно удалена",
                roleRemoving: "Удаление роли",
                roleRemovingQuestion: "Вы уверены, что хотите удалить роль <b>{{role}}</b>?"
            },
            actions: "Действия",
            createRole: "Создать роль",
            edit: "Редактировать",
            empty: "пусто",
            name: "Название",
            permissions: "Разрешения",
            remove: "Удалить",
            roles: "Роли"
        },
        $simpleLayout: {
            goHome: "На главную",
            simpleLayout: "Простой лэйаут"
        },
        $users: {
            $$dialogRoleAssigning: {
                cancel: "Отмена",
                role: "Роль",
                roleAssigning: "Назначение роли",
                roleEditedSuccessfully: "Роль успешно изменена",
                save: "Сохранить",
                user: "Пользователь"
            },
            $$dialogUserBanning: {
                ban: "Забанить",
                cancel: "Отмена",
                enterReason: "Введите причину...",
                reason: "Причина",
                user: "Пользователь",
                userBannedSuccessfully: "Пользователь успешно забанен",
                userBanning: "Бан пользователя"
            },
            $_id: {
                $$dialogAvatarRemoving: {
                    avatarRemovedSuccessfully: "Аватар успешно удалён",
                    avatarRemoving: "Удаление аватара",
                    avatarRemovingQuestion: "Вы действительно хотите удалить ваш аватар?",
                    cancel: "Отмена",
                    remove: "Удалить"
                },
                $$dialogEmailChanging: {
                    cancel: "Отмена",
                    change: "Изменить",
                    confirmationEmailSent:
                        "Письмо с подтверждением было отправлено на ваш текущий адрес электронной почты",
                    email: "Электронная почта",
                    emailChanging: "Изменение электронной почты"
                },
                $$dialogPasswordChanging: {
                    cancel: "Отмена",
                    change: "Изменить",
                    newPassword: "Новый пароль",
                    oldPassword: "Старый пароль",
                    passwordChangedSuccessfully: "Пароль успешно изменён",
                    passwordChanging: "Изменение пароля"
                },
                $$dialogProfileEditing: {
                    cancel: "Отмена",
                    email: "Электронная почта",
                    profileEditedSuccessfully: "Профиль успешно изменён",
                    profileEditing: "Изменение профиля",
                    save: "Сохранить",
                    username: "Имя пользователя"
                },
                avatar: "Аватар",
                avatarUpdatedSuccessfully: "Аватар успешно обновлён",
                banAuthor: "Автор бана",
                banDate: "Дата бана",
                banned: "Забанен",
                banReason: "Причина бана",
                changeEmail: "Изменить электронную почту",
                changePassword: "Изменить пароль",
                confirmationEmailSent:
                    "Письмо с подтверждением было отправлено на ваш адрес электронной почты",
                edit: "Редактировать",
                email: "Электронная почта",
                no: "Нет",
                profile: "Профиль",
                registrationDate: "Дата регистрации",
                removeAvatar: "Удалить аватар",
                role: "Роль",
                uploadAvatar: "Загрузить аватар",
                username: "Имя пользователя",
                yes: "Да"
            },
            actions: "Действия",
            assignRole: "Назначить роль",
            avatar: "Аватар",
            ban: "Забанить",
            banned: "Забанен",
            confirmedEmail: "Подтверждённая электронная почта",
            email: "Электронная почта",
            no: "Нет",
            open: "Открыть",
            reason: "Причина",
            registrationDate: "Дата регистрации",
            role: "Роль",
            unban: "Разбанить",
            username: "Имя пользователя",
            users: "Пользователи",
            userUnbannedSuccessfully: "Пользователь успешно разбанен",
            who: "Кто",
            yes: "Да"
        },
        clicked: "Кликов",
        count: "Количество",
        home: "Главная",
        randomNumber: "Случайное число"
    },
    $$alert: {
        error: "Ошибка",
        info: "Информация",
        success: "Успех",
        warning: "Предупреждение"
    },
    $$chat: {
        message: "Сообщение",
        send: "Отправить"
    },
    errorOccurred: "Произошла ошибка"
} satisfies BaseTranslation

export default ru
