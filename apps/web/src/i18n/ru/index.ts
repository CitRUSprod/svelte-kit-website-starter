import type { BaseTranslation } from "../i18n-types"

const ru = {
    errorOccurred: "Произошла ошибка",

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

    $: {
        clicked: "Кликов",
        count: "Количество",
        home: "Главная",
        randomNumber: "Случайное число",

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

        $error: {
            error: "Ошибка",
            goHome: "На главную"
        },

        $chat: {
            chat: "Чат"
        },

        $simpleLayout: {
            goHome: "На главную",
            simpleLayout: "Простой лэйаут"
        },

        $auth: {
            $login: {
                doLogin: "Войти",
                email: "Электронная почта",
                forgotPassword: "Забыли пароль?",
                loggedInSuccessfully: "Вы успешно вошли",
                login: "Вход",
                password: "Пароль",
                registration: "Регистрация",
                orLoginWith: "или войти с помощью"
            },

            $logout: {
                loggedOutSuccessfully: "Вы успешно вышли",
                logout: "Выход",
                redirecting: "Перенаправляем..."
            },

            $registration: {
                email: "Электронная почта",
                login: "Вход",
                password: "Пароль",
                passwordConfirmation: "Подтверждение пароля",
                register: "Зарегистрироваться",
                registration: "Регистрация",
                username: "Имя пользователя",
                orRegisterWith: "или зарегистрироваться с помощью",
                confirmationEmailSent:
                    "Письмо с подтверждением было отправлено на ваш адрес электронной почты",

                $complete: {
                    $_token: {
                        registration: "Регистрация",
                        redirecting: "Перенаправляем...",
                        registeredSuccessfully: "Вы успешно зарегистрировались"
                    }
                },

                $oauth: {
                    $_token: {
                        registration: "Регистрация",
                        registeredSuccessfully: "Вы успешно зарегистрировались",
                        username: "Имя пользователя",
                        register: "Зарегистрироваться"
                    }
                }
            }
        },

        $posts: {
            author: "Автор",
            createPost: "Создать новый пост",
            creationDateAsc: "Дата создания (Сначала старые)",
            creationDateDesc: "Дата создания (Сначала новые)",
            enterTitle: "Введите заголовок...",
            posts: "Посты",
            search: "Поиск",
            sorting: "Сортировка",
            titleAsc: "Заголовок (А-Я)",
            titleDesc: "Заголовок (Я-А)",

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
                author: "Автор",
                created: "Создан",
                edit: "Редактировать",
                edited: "Отредактирован",
                remove: "Удалить",

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
                }
            }
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
                email: "Электронная почта",
                enterEmail: "Введите электронную почту...",
                passwordReset: "Сброс пароля",
                resetLinkSent: "Ссылка на сброс была отправлена на ваш адрес электронной почты",
                sendResetLink: "Отправить ссылку на сброс",

                $_token: {
                    enterNewPassword: "Введите новый пароль...",
                    enterNewPasswordAgain: "Введите новый пароль снова...",
                    newPassword: "Новый пароль",
                    newPasswordConfirmation: "Подтверждение нового пароля",
                    passwordReset: "Сброс пароля",
                    passwordResetSuccessfully: "Пароль успешно сброшен",
                    reset: "Сбросить"
                }
            }
        },

        $roles: {
            actions: "Действия",
            createRole: "Создать роль",
            edit: "Редактировать",
            empty: "пусто",
            name: "Название",
            permissions: "Разрешения",
            remove: "Удалить",
            roles: "Роли",

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
            }
        },

        $users: {
            actions: "Действия",
            assignRole: "Назначить роль",
            avatar: "Аватар",
            ban: "Забанить",
            banned: "Забанен",
            confirmedEmail: "Подтверждённая электронная почта",
            email: "Электронная почта",
            open: "Открыть",
            registrationDate: "Дата регистрации",
            role: "Роль",
            unban: "Разбанить",
            userBannedSuccessfully: "Пользователь успешно забанен",
            userUnbannedSuccessfully: "Пользователь успешно разбанен",
            username: "Имя пользователя",
            users: "Пользователи",

            $$dialogRoleAssigning: {
                cancel: "Отмена",
                role: "Роль",
                roleAssigning: "Назначение роли",
                roleEditedSuccessfully: "Роль успешно изменена",
                save: "Сохранить"
            },

            $_id: {
                avatar: "Аватар",
                avatarUpdatedSuccessfully: "Аватар успешно обновлён",
                banned: "Забанен",
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
                yes: "Да",

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
                    email: "Электронная почта",
                    confirmationEmailSent:
                        "Письмо с подтверждением было отправлено на ваш текущий адрес электронной почты",
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
                }
            }
        }
    }
} satisfies BaseTranslation

export default ru
