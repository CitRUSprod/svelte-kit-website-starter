export const base = "/profile"

export const getUser = `${base}/user`
export const updateUser = `${base}/user`
export const uploadAvatar = `${base}/avatar`
export const deleteAvatar = `${base}/avatar`
export const sendConfirmationEmail = `${base}/email/confirm`
export const confirmEmail = `${base}/email/confirm/:emailConfirmationToken`
export const changePassword = `${base}/password/change`
export const sendPasswordResetEmail = `${base}/password/reset`
export const resetPassword = `${base}/password/reset/:passwordResetToken`
