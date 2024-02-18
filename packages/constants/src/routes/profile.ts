export const base = "/profile"

export const getUser = `${base}/user`
export const updateUser = `${base}/user`
export const uploadAvatar = `${base}/avatar`
export const deleteAvatar = `${base}/avatar`
export const sendEmailUpdateEmailToOld = `${base}/email`
export const sendEmailUpdateEmailToNew = `${base}/email/from/:emailUpdateToken`
export const updateEmail = `${base}/email/to/:emailUpdateToken`
export const changePassword = `${base}/password/change`
export const sendPasswordResetEmail = `${base}/password/reset`
export const resetPassword = `${base}/password/reset/:passwordResetToken`
