import { MultipartFile } from "@fastify/multipart"
import { Type, Static } from "@sinclair/typebox"
import * as schemas from "$/schemas"

export const updateUserBody = Type.Strict(
    Type.Object(
        {
            email: Type.Optional(schemas.models.user.email()),
            username: Type.Optional(schemas.models.user.username())
        },
        { additionalProperties: false, minProperties: 1 }
    )
)

export type UpdateUserBody = Static<typeof updateUserBody>

export const uploadAvatarBody = Type.Strict(
    Type.Object(
        {
            img: schemas.file()
        },
        { additionalProperties: false }
    )
)

export interface UploadAvatarBody {
    img: MultipartFile
}

export const confirmEmailParams = Type.Strict(
    Type.Object(
        {
            emailConfirmationToken: schemas.models.emailConfirmationToken.token()
        },
        { additionalProperties: false }
    )
)

export type ConfirmEmailParams = Static<typeof confirmEmailParams>

export const changePasswordBody = Type.Strict(
    Type.Object(
        {
            oldPassword: schemas.models.user.password(),
            newPassword: schemas.models.user.password()
        },
        { additionalProperties: false }
    )
)

export type ChangePasswordBody = Static<typeof changePasswordBody>

export const sendPasswordResetEmailBody = Type.Strict(
    Type.Object(
        {
            email: schemas.models.user.email()
        },
        { additionalProperties: false }
    )
)

export type SendPasswordResetEmailBody = Static<typeof sendPasswordResetEmailBody>

export const resetPasswordParams = Type.Strict(
    Type.Object(
        {
            passwordResetToken: schemas.models.passwordResetToken.token()
        },
        { additionalProperties: false }
    )
)

export type ResetPasswordParams = Static<typeof resetPasswordParams>

export const resetPasswordBody = Type.Strict(
    Type.Object(
        {
            newPassword: schemas.models.user.password()
        },
        { additionalProperties: false }
    )
)

export type ResetPasswordBody = Static<typeof resetPasswordBody>
