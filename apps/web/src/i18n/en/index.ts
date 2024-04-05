import type { Translation } from "../i18n-types"

const en = {
    $: {
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
        $auth: {
            $login: {
                $_provider: {
                    $callback: {
                        loggedInSuccessfully: "You have successfully logged in",
                        login: "Login",
                        redirecting: "Redirecting..."
                    }
                },
                doLogin: "Login",
                email: "Email",
                forgotPassword: "Forgot password?",
                loggedInSuccessfully: "You have successfully logged in",
                login: "Login",
                orLoginWith: "or login with",
                password: "Password",
                registration: "Registration"
            },
            $logout: {
                loggedOutSuccessfully: "You have successfully logged out",
                logout: "Logout",
                redirecting: "Redirecting..."
            },
            $registration: {
                $complete: {
                    $_token: {
                        redirecting: "Redirecting...",
                        registeredSuccessfully: "You have successfully registered",
                        registration: "Registration"
                    }
                },
                $oauth: {
                    $_token: {
                        register: "Register",
                        registeredSuccessfully: "You have successfully registered",
                        registration: "Registration",
                        username: "Username"
                    }
                },
                confirmationEmailSent: "A confirmation email was sent to your email address",
                email: "Email",
                login: "Login",
                orRegisterWith: "or register with",
                password: "Password",
                passwordConfirmation: "Password confirmation",
                register: "Register",
                registration: "Registration",
                username: "Username"
            }
        },
        $chat: {
            chat: "Chat"
        },
        $error: {
            error: "Error",
            goHome: "Go home"
        },
        $posts: {
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
                },
                author: "Author",
                created: "Created",
                edit: "Edit",
                edited: "Edited",
                remove: "Remove"
            },
            author: "Author",
            createPost: "Create a new post",
            creationDateAsc: "Creation date (Earliest)",
            creationDateDesc: "Creation date (Latest)",
            enterTitle: "Enter title...",
            posts: "Posts",
            search: "Search",
            sorting: "Sorting",
            titleAsc: "Title (A-Z)",
            titleDesc: "Title (Z-A)"
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
                $_token: {
                    enterNewPassword: "Enter a new password...",
                    enterNewPasswordAgain: "Enter a new password again...",
                    newPassword: "New password",
                    newPasswordConfirmation: "New password confirmation",
                    passwordReset: "Password reset",
                    passwordResetSuccessfully: "Password has been successfully reset",
                    reset: "Reset"
                },
                email: "Email",
                enterEmail: "Enter email...",
                passwordReset: "Password reset",
                resetLinkSent: "A reset link was sent to your email address",
                sendResetLink: "Send reset link"
            }
        },
        $roles: {
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
            },
            actions: "Actions",
            createRole: "Create a role",
            edit: "Edit",
            empty: "empty",
            name: "Name",
            permissions: "Permissions",
            remove: "Remove",
            roles: "Roles"
        },
        $simpleLayout: {
            goHome: "Go home",
            simpleLayout: "Simple layout"
        },
        $users: {
            $$dialogRoleAssigning: {
                cancel: "Cancel",
                role: "Role",
                roleAssigning: "Role assigning",
                roleEditedSuccessfully: "Role successfully edited",
                save: "Save",
                user: "User"
            },
            $$dialogUserBanning: {
                ban: "Ban",
                cancel: "Cancel",
                enterReason: "Enter a reason...",
                reason: "Reason",
                user: "User",
                userBannedSuccessfully: "User successfully banned",
                userBanning: "User banning"
            },
            $_id: {
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
                    confirmationEmailSent:
                        "A confirmation email was sent to your current email address",
                    email: "Email",
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
                },
                avatar: "Avatar",
                avatarUpdatedSuccessfully: "Avatar successfully updated",
                banAuthor: "Ban author",
                banDate: "Ban date",
                banned: "Banned",
                banReason: "Ban reason",
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
                yes: "Yes"
            },
            actions: "Actions",
            assignRole: "Assign role",
            avatar: "Avatar",
            ban: "Ban",
            banned: "Banned",
            confirmedEmail: "Confirmed email",
            email: "Email",
            no: "No",
            open: "Open",
            reason: "Reason",
            registrationDate: "Registration date",
            role: "Role",
            unban: "Unban",
            username: "Username",
            users: "Users",
            userUnbannedSuccessfully: "User successfully unbanned",
            who: "Who",
            yes: "Yes"
        },
        clicked: "Clicked",
        count: "Count",
        home: "Home",
        randomNumber: "Random number"
    },
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
    errorOccurred: "An error has occurred"
} satisfies Translation

export default en
