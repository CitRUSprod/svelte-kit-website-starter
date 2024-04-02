import type { Translation } from "../i18n-types"

const en = {
    errorOccurred: "An error has occurred",

    $$alert: {
        error: "Error",
        info: "Info",
        success: "Success",
        warning: "Warning"
    },

    $$chat: {
        message: "Message",
        send: "Send"
    },

    $: {
        clicked: "Clicked",
        count: "Count",
        home: "Home",
        randomNumber: "Random number",

        $$header: {
            chat: "Chat",
            login: "Login",
            logout: "Logout",
            posts: "Posts",
            profile: "Profile",
            roles: "Roles",
            simpleLayout: "Simple layout",
            users: "Users"
        },

        $error: {
            error: "Error",
            goHome: "Go home"
        },

        $chat: {
            chat: "Chat"
        },

        $simpleLayout: {
            goHome: "Go home",
            simpleLayout: "Simple layout"
        },

        $auth: {
            $login: {
                doLogin: "Login",
                email: "Email",
                forgotPassword: "Forgot password?",
                loggedInSuccessfully: "You have successfully logged in",
                login: "Login",
                password: "Password",
                registration: "Registration",
                orLoginWith: "or login with",

                $_provider: {
                    $callback: {
                        loggedInSuccessfully: "You have successfully logged in",
                        login: "Login",
                        redirecting: "Redirecting..."
                    }
                }
            },

            $logout: {
                loggedOutSuccessfully: "You have successfully logged out",
                logout: "Logout",
                redirecting: "Redirecting..."
            },

            $registration: {
                email: "Email",
                login: "Login",
                password: "Password",
                passwordConfirmation: "Password confirmation",
                register: "Register",
                registration: "Registration",
                username: "Username",
                orRegisterWith: "or register with",
                confirmationEmailSent: "A confirmation email was sent to your email address",

                $complete: {
                    $_token: {
                        registration: "Registration",
                        redirecting: "Redirecting...",
                        registeredSuccessfully: "You have successfully registered"
                    }
                },

                $oauth: {
                    $_token: {
                        registration: "Registration",
                        registeredSuccessfully: "You have successfully registered",
                        username: "Username",
                        register: "Register"
                    }
                }
            }
        },

        $posts: {
            author: "Author",
            createPost: "Create a new post",
            creationDateAsc: "Creation date (Earliest)",
            creationDateDesc: "Creation date (Latest)",
            enterTitle: "Enter title...",
            posts: "Posts",
            search: "Search",
            sorting: "Sorting",
            titleAsc: "Title (A-Z)",
            titleDesc: "Title (Z-A)",

            $$dialogPostCreating: {
                cancel: "Cancel",
                content: "Content",
                create: "Create",
                enterContent: "Enter a content...",
                enterTitle: "Enter a title...",
                postCreatedSuccessfully: "Post successfully created",
                postCreating: "Creating a post",
                title: "Title"
            },

            $_id: {
                author: "Author",
                created: "Created",
                edit: "Edit",
                edited: "Edited",
                remove: "Remove",

                $$dialogPostEditing: {
                    cancel: "Cancel",
                    content: "Content",
                    enterContent: "Enter a content...",
                    enterTitle: "Enter a title...",
                    postEditedSuccessfully: "Post successfully edited",
                    postEditing: "Editing a post",
                    save: "Save",
                    title: "Title"
                },

                $$dialogPostRemoving: {
                    cancel: "Cancel",
                    postRemovedSuccessfully: "Post successfully removed",
                    postRemoving: "Removing a post",
                    postRemovingQuestion: "Are you sure you want to remove this post?",
                    remove: "Remove"
                }
            }
        },

        $profile: {
            $email: {
                $from: {
                    $_token: {
                        emailChangeConfirmation: "Email change confirmation",
                        emailChangeConfirmationSent:
                            "A confirmation email was sent to your new email address",
                        redirecting: "Redirecting..."
                    }
                },

                $to: {
                    $_token: {
                        emailChangeConfirmation: "Email change confirmation",
                        emailChangedSuccessfully: "Email has been successfully updated",
                        redirecting: "Redirecting..."
                    }
                }
            },

            $password: {
                email: "Email",
                enterEmail: "Enter email...",
                passwordReset: "Password reset",
                resetLinkSent: "A reset link was sent to your email address",
                sendResetLink: "Send reset link",

                $_token: {
                    enterNewPassword: "Enter a new password...",
                    enterNewPasswordAgain: "Enter a new password again...",
                    newPassword: "New password",
                    newPasswordConfirmation: "New password confirmation",
                    passwordReset: "Password reset",
                    passwordResetSuccessfully: "Password has been successfully reset",
                    reset: "Reset"
                }
            }
        },

        $roles: {
            actions: "Actions",
            createRole: "Create a role",
            edit: "Edit",
            empty: "empty",
            name: "Name",
            permissions: "Permissions",
            remove: "Remove",
            roles: "Roles",

            $$dialogRoleCreating: {
                add: "Add",
                cancel: "Cancel",
                create: "Create",
                empty: "empty",
                name: "Name",
                permission: "Permission",
                permissions: "Permissions",
                roleCreatedSuccessfully: "Role successfully created",
                roleCreating: "Creating a role"
            },

            $$dialogRoleEditing: {
                add: "Add",
                cancel: "Cancel",
                empty: "empty",
                name: "Name",
                permission: "Permission",
                permissions: "Permissions",
                roleEditedSuccessfully: "Role successfully edited",
                roleEditing: "Editing a role",
                save: "Save"
            },

            $$dialogRoleRemoving: {
                cancel: "Cancel",
                remove: "Remove",
                roleRemovedSuccessfully: "Role successfully removed",
                roleRemoving: "Removing a role",
                roleRemovingQuestion: "Are you sure you want to remove <b>{{role}}</b> role?"
            }
        },

        $users: {
            actions: "Actions",
            assignRole: "Assign role",
            avatar: "Avatar",
            ban: "Ban",
            banned: "Banned",
            confirmedEmail: "Confirmed email",
            email: "Email",
            open: "Open",
            registrationDate: "Registration date",
            role: "Role",
            unban: "Unban",
            userUnbannedSuccessfully: "User successfully unbanned",
            username: "Username",
            users: "Users",
            yes: "Yes",
            no: "No",
            who: "Who",
            reason: "Reason",

            $$dialogRoleAssigning: {
                cancel: "Cancel",
                role: "Role",
                roleAssigning: "Role assigning",
                roleEditedSuccessfully: "Role successfully edited",
                save: "Save",
                user: "User"
            },

            $$dialogUserBanning: {
                cancel: "Cancel",
                enterReason: "Enter a reason...",
                reason: "Reason",
                userBanning: "User banning",
                userBannedSuccessfully: "User successfully banned",
                ban: "Ban",
                user: "User"
            },

            $_id: {
                avatar: "Avatar",
                avatarUpdatedSuccessfully: "Avatar successfully updated",
                banned: "Banned",
                changeEmail: "Change email",
                changePassword: "Change password",
                confirmationEmailSent: "A confirmation email was sent to your email address",
                edit: "Edit",
                email: "Email",
                no: "No",
                profile: "Profile",
                registrationDate: "Registration date",
                removeAvatar: "Remove avatar",
                role: "Role",
                uploadAvatar: "Upload avatar",
                username: "Username",
                yes: "Yes",
                banAuthor: "Ban author",
                banReason: "Ban reason",
                banDate: "Ban date",

                $$dialogAvatarRemoving: {
                    avatarRemovedSuccessfully: "Avatar successfully removed",
                    avatarRemoving: "Removing an avatar",
                    avatarRemovingQuestion: "Are you sure you want to remove your avatar?",
                    cancel: "Cancel",
                    remove: "Remove"
                },

                $$dialogEmailChanging: {
                    cancel: "Cancel",
                    change: "Change",
                    email: "Email",
                    confirmationEmailSent:
                        "A confirmation email was sent to your current email address",
                    emailChanging: "Email changing"
                },

                $$dialogPasswordChanging: {
                    cancel: "Cancel",
                    change: "Change",
                    newPassword: "New password",
                    oldPassword: "Old password",
                    passwordChangedSuccessfully: "Password successfully changed",
                    passwordChanging: "Password changing"
                },

                $$dialogProfileEditing: {
                    cancel: "Cancel",
                    email: "Email",
                    profileEditedSuccessfully: "Profile successfully edited",
                    profileEditing: "Profile editing",
                    save: "Save",
                    username: "Username"
                }
            }
        }
    }
} satisfies Translation

export default en
