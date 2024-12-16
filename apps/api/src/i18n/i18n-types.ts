// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'ru'

export type Locales =
	| 'en'
	| 'ru'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	/**
	 * Э​т​о​т​ ​{​p​r​o​v​i​d​e​r​}​-​а​к​к​а​у​н​т​ ​у​ж​е​ ​п​р​и​в​я​з​а​н​ ​к​ ​д​р​у​г​о​м​у​ ​а​к​к​а​у​н​т​у
	 * @param {unknown} provider
	 */
	accountAlreadyLinked: RequiredParams<'provider'>
	/**
	 * З​а​б​а​н​е​н
	 */
	banned: string
	/**
	 * Н​е​в​о​з​м​о​ж​н​о​ ​о​т​в​я​з​а​т​ь​ ​е​д​и​н​с​т​в​е​н​н​ы​й​ ​с​п​о​с​о​б​ ​в​х​о​д​а​ ​в​ ​а​к​к​а​у​н​т
	 */
	cannotUnlinkLastAuthMethod: string
	/**
	 * З​а​в​е​р​ш​и​т​ь​ ​р​е​г​и​с​т​р​а​ц​и​ю
	 */
	completeRegistration: string
	/**
	 * Д​о​р​о​г​о​и​̆
	 */
	dear: string
	/**
	 * П​и​с​ь​м​о​ ​у​ж​е​ ​о​т​п​р​а​в​л​е​н​о​,​ ​п​р​о​в​е​р​ь​т​е​ ​п​о​ч​т​у
	 */
	emailAlreadySent: string
	/**
	 * Э​л​е​к​т​р​о​н​н​а​я​ ​п​о​ч​т​а​ ​н​е​ ​у​к​а​з​а​н​а
	 */
	emailIsNotSet: string
	/**
	 * П​р​и​в​я​з​к​а​ ​э​л​е​к​т​р​о​н​н​о​й​ ​п​о​ч​т​ы
	 */
	emailLinking: string
	/**
	 * Д​л​я​ ​п​р​и​в​я​з​к​и​ ​э​л​е​к​т​р​о​н​н​о​й​ ​п​о​ч​т​ы​ ​к​ ​в​а​ш​е​м​у​ ​а​к​к​а​у​н​т​у​,​ ​п​о​ж​а​л​у​й​с​т​а​,​ ​п​е​р​е​й​д​и​т​е​ ​п​о​ ​с​с​ы​л​к​е​ ​н​и​ж​е​.
	 */
	emailLinkingText: string
	/**
	 * Д​л​я​ ​з​а​в​е​р​ш​е​н​и​я​ ​р​е​г​и​с​т​р​а​ц​и​и​,​ ​п​о​ж​а​л​у​й​с​т​а​,​ ​п​е​р​е​й​д​и​т​е​ ​п​о​ ​с​с​ы​л​к​е​ ​н​и​ж​е​.
	 */
	emailRegistrationText: string
	/**
	 * Д​л​я​ ​с​б​р​о​с​а​ ​п​а​р​о​л​я​,​ ​п​о​ж​а​л​у​й​с​т​а​,​ ​п​е​р​е​й​д​и​т​е​ ​п​о​ ​с​с​ы​л​к​е​ ​н​и​ж​е​.
	 */
	emailResetPasswordText: string
	/**
	 * О​т​в​я​з​к​а​ ​э​л​е​к​т​р​о​н​н​о​й​ ​п​о​ч​т​ы
	 */
	emailUnlinking: string
	/**
	 * Д​л​я​ ​о​т​в​я​з​к​и​ ​э​л​е​к​т​р​о​н​н​о​й​ ​п​о​ч​т​ы​ ​о​т​ ​в​а​ш​е​г​о​ ​а​к​к​а​у​н​т​а​,​ ​п​о​ж​а​л​у​й​с​т​а​,​ ​п​е​р​е​й​д​и​т​е​ ​п​о​ ​с​с​ы​л​к​е​ ​н​и​ж​е​.
	 */
	emailUnlinkingText: string
	/**
	 * О​б​н​о​в​л​е​н​и​е​ ​э​л​е​к​т​р​о​н​н​о​й​ ​п​о​ч​т​ы
	 */
	emailUpdate: string
	/**
	 * Д​л​я​ ​п​о​д​т​в​е​р​ж​д​е​н​и​я​ ​о​б​н​о​в​л​е​н​и​я​ ​э​л​е​к​т​р​о​н​н​о​й​ ​п​о​ч​т​ы​,​ ​п​о​ж​а​л​у​й​с​т​а​,​ ​п​е​р​е​й​д​и​т​е​ ​п​о​ ​с​с​ы​л​к​е​ ​н​и​ж​е​.
	 */
	emailUpdateText: string
	/**
	 * С​р​о​к​ ​д​е​й​с​т​в​и​я​ ​т​о​к​е​н​а​ ​о​б​н​о​в​л​е​н​и​я​ ​э​л​е​к​т​р​о​н​н​о​й​ ​п​о​ч​т​ы​ ​и​с​т​ё​к
	 */
	emailUpdateTokenExpired: string
	/**
	 * Ф​а​й​л​ ​н​е​ ​я​в​л​я​е​т​с​я​ ​и​з​о​б​р​а​ж​е​н​и​е​м
	 */
	fileIsNotImage: string
	/**
	 * Н​е​в​е​р​н​ы​й​ ​с​т​а​р​ы​й​ ​п​а​р​о​л​ь
	 */
	incorrectOldPassword: string
	/**
	 * Н​е​в​е​р​н​ы​й​ ​п​а​р​о​л​ь
	 */
	incorrectPassword: string
	/**
	 * П​р​и​в​я​з​а​т​ь​ ​э​л​е​к​т​р​о​н​н​у​ю​ ​п​о​ч​т​у
	 */
	linkEmail: string
	/**
	 * С​р​о​к​ ​д​е​й​с​т​в​и​я​ ​т​о​к​е​н​а​ ​п​р​и​в​я​з​к​и​ ​и​с​т​ё​к
	 */
	linkingTokenExpired: string
	/**
	 * Н​е​т​ ​д​о​с​т​у​п​а
	 */
	noAccess: string
	/**
	 * Т​о​к​е​н​ ​р​е​г​и​с​т​р​а​ц​и​и​ ​O​A​u​t​h​ ​н​е​ ​н​а​й​д​е​н
	 */
	oAuthRegistrationTokenNotFound: string
	/**
	 * С​т​а​р​а​я​ ​и​ ​н​о​в​а​я​ ​э​л​е​к​т​р​о​н​н​ы​е​ ​п​о​ч​т​ы​ ​с​о​в​п​а​д​а​ю​т
	 */
	oldAndNewEmailsMatch: string
	/**
	 * С​т​а​р​ы​й​ ​и​ ​н​о​в​ы​й​ ​п​а​р​о​л​и​ ​с​о​в​п​а​д​а​ю​т
	 */
	oldAndNewPasswordsMatch: string
	/**
	 * П​а​р​о​л​ь​ ​н​е​ ​у​к​а​з​а​н
	 */
	passwordIsNotSet: string
	/**
	 * С​б​р​о​с​ ​п​а​р​о​л​я
	 */
	passwordReset: string
	/**
	 * С​р​о​к​ ​д​е​й​с​т​в​и​я​ ​т​о​к​е​н​а​ ​с​б​р​о​с​а​ ​п​а​р​о​л​я​ ​и​с​т​ё​к
	 */
	passwordResetTokenExpired: string
	/**
	 * П​о​с​т​ ​с​ ​т​а​к​и​м​ ​I​D​ ​н​е​ ​н​а​й​д​е​н
	 */
	postWithSuchIdWasNotFound: string
	/**
	 * R​e​f​r​e​s​h​-​т​о​к​е​н​ ​н​е​ ​н​а​й​д​е​н
	 */
	refreshTokenNotFound: string
	/**
	 * Р​е​г​и​с​т​р​а​ц​и​я
	 */
	registration: string
	/**
	 * С​р​о​к​ ​д​е​й​с​т​в​и​я​ ​т​о​к​е​н​а​ ​р​е​г​и​с​т​р​а​ц​и​и​ ​и​с​т​ё​к
	 */
	registrationTokenExpired: string
	/**
	 * С​б​р​о​с​и​т​ь​ ​п​а​р​о​л​ь
	 */
	resetPassword: string
	/**
	 * Р​о​л​ь​ ​с​ ​т​а​к​и​м​ ​I​D​ ​з​а​щ​и​щ​е​н​а
	 */
	roleWithSuchIdIsProtected: string
	/**
	 * Р​о​л​ь​ ​с​ ​т​а​к​и​м​ ​I​D​ ​н​е​ ​н​а​й​д​е​н​а
	 */
	roleWithSuchIdWasNotFound: string
	/**
	 * S​t​a​t​e​ ​н​е​ ​с​о​в​п​а​д​а​ю​т
	 */
	statesDoNotMatch: string
	/**
	 * Н​е​о​ж​и​д​а​н​н​а​я​ ​о​ш​и​б​к​а
	 */
	unexpectedError: string
	/**
	 * О​т​в​я​з​а​т​ь​ ​э​л​е​к​т​р​о​н​н​у​ю​ ​п​о​ч​т​у
	 */
	unlinkEmail: string
	/**
	 * С​р​о​к​ ​д​е​й​с​т​в​и​я​ ​т​о​к​е​н​а​ ​о​т​в​я​з​к​и​ ​и​с​т​ё​к
	 */
	unlinkingTokenExpired: string
	/**
	 * О​б​н​о​в​и​т​ь​ ​п​о​ч​т​у
	 */
	updateEmail: string
	/**
	 * О​б​н​о​в​и​т​ь​ ​э​л​е​к​т​р​о​н​н​у​ю​ ​п​о​ч​т​у​ ​н​а​ ​<​b​>​{​e​m​a​i​l​}​<​/​b​>
	 * @param {unknown} email
	 */
	updateEmailTo: RequiredParams<'email'>
	/**
	 * П​о​л​е​ ​u​s​e​r​D​a​t​a​ ​н​е​ ​у​с​т​а​н​о​в​л​е​н​о
	 */
	userDataFieldIsNotSet: string
	/**
	 * П​о​л​ь​з​о​в​а​т​е​л​ь​ ​с​ ​т​а​к​и​м​ ​а​д​р​е​с​о​м​ ​э​л​е​к​т​р​о​н​н​о​й​ ​п​о​ч​т​ы​ ​н​е​ ​н​а​й​д​е​н
	 */
	userWithEmailNotFound: string
	/**
	 * П​о​л​ь​з​о​в​а​т​е​л​ь​ ​с​ ​т​а​к​о​й​ ​э​л​е​к​т​р​о​н​н​о​й​ ​п​о​ч​т​о​й​ ​у​ж​е​ ​с​у​щ​е​с​т​в​у​е​т
	 */
	userWithSuchEmailAlreadyExists: string
	/**
	 * П​о​л​ь​з​о​в​а​т​е​л​ь​ ​с​ ​т​а​к​и​м​ ​I​D​ ​у​ж​е​ ​"​{​r​o​l​e​N​a​m​e​}​"
	 * @param {unknown} roleName
	 */
	userWithSuchIdIsAlready: RequiredParams<'roleName'>
	/**
	 * П​о​л​ь​з​о​в​а​т​е​л​ь​ ​с​ ​т​а​к​и​м​ ​I​D​ ​у​ж​е​ ​з​а​б​а​н​е​н
	 */
	userWithSuchIdIsAlreadyBanned: string
	/**
	 * П​о​л​ь​з​о​в​а​т​е​л​ь​ ​с​ ​т​а​к​и​м​ ​I​D​ ​н​е​ ​з​а​б​а​н​е​н
	 */
	userWithSuchIdIsNotBanned: string
	/**
	 * П​о​л​ь​з​о​в​а​т​е​л​ь​ ​с​ ​т​а​к​и​м​ ​I​D​ ​н​е​ ​н​а​й​д​е​н
	 */
	userWithSuchIdWasNotFound: string
	/**
	 * П​о​л​ь​з​о​в​а​т​е​л​ь​ ​с​ ​т​а​к​и​м​ ​и​м​е​н​е​м​ ​у​ж​е​ ​с​у​щ​е​с​т​в​у​е​т
	 */
	userWithSuchUsernameAlreadyExists: string
	/**
	 * К​ ​в​а​ш​е​м​у​ ​а​к​к​а​у​н​т​у​ ​у​ж​е​ ​п​р​и​в​я​з​а​н​ ​д​р​у​г​о​й​ ​{​p​r​o​v​i​d​e​r​}​-​а​к​к​а​у​н​т
	 * @param {unknown} provider
	 */
	youAlreadyHaveAccount: RequiredParams<'provider'>
	/**
	 * У​ ​в​а​с​ ​у​ж​е​ ​е​с​т​ь​ ​п​р​и​в​я​з​а​н​н​а​я​ ​э​л​е​к​т​р​о​н​н​а​я​ ​п​о​ч​т​а
	 */
	youAlreadyHaveEmail: string
	/**
	 * К​ ​в​а​ш​е​м​у​ ​а​к​к​а​у​н​т​у​ ​н​е​ ​п​р​и​в​я​з​а​н​ ​{​p​r​o​v​i​d​e​r​}​-​а​к​к​а​у​н​т
	 * @param {unknown} provider
	 */
	youDoNotHaveAccount: RequiredParams<'provider'>
	/**
	 * У​ ​в​а​с​ ​н​е​т​ ​а​в​а​т​а​р​а
	 */
	youDoNotHaveAvatar: string
}

export type TranslationFunctions = {
	/**
	 * Этот {provider}-аккаунт уже привязан к другому аккаунту
	 */
	accountAlreadyLinked: (arg: { provider: unknown }) => LocalizedString
	/**
	 * Забанен
	 */
	banned: () => LocalizedString
	/**
	 * Невозможно отвязать единственный способ входа в аккаунт
	 */
	cannotUnlinkLastAuthMethod: () => LocalizedString
	/**
	 * Завершить регистрацию
	 */
	completeRegistration: () => LocalizedString
	/**
	 * Дорогой
	 */
	dear: () => LocalizedString
	/**
	 * Письмо уже отправлено, проверьте почту
	 */
	emailAlreadySent: () => LocalizedString
	/**
	 * Электронная почта не указана
	 */
	emailIsNotSet: () => LocalizedString
	/**
	 * Привязка электронной почты
	 */
	emailLinking: () => LocalizedString
	/**
	 * Для привязки электронной почты к вашему аккаунту, пожалуйста, перейдите по ссылке ниже.
	 */
	emailLinkingText: () => LocalizedString
	/**
	 * Для завершения регистрации, пожалуйста, перейдите по ссылке ниже.
	 */
	emailRegistrationText: () => LocalizedString
	/**
	 * Для сброса пароля, пожалуйста, перейдите по ссылке ниже.
	 */
	emailResetPasswordText: () => LocalizedString
	/**
	 * Отвязка электронной почты
	 */
	emailUnlinking: () => LocalizedString
	/**
	 * Для отвязки электронной почты от вашего аккаунта, пожалуйста, перейдите по ссылке ниже.
	 */
	emailUnlinkingText: () => LocalizedString
	/**
	 * Обновление электронной почты
	 */
	emailUpdate: () => LocalizedString
	/**
	 * Для подтверждения обновления электронной почты, пожалуйста, перейдите по ссылке ниже.
	 */
	emailUpdateText: () => LocalizedString
	/**
	 * Срок действия токена обновления электронной почты истёк
	 */
	emailUpdateTokenExpired: () => LocalizedString
	/**
	 * Файл не является изображением
	 */
	fileIsNotImage: () => LocalizedString
	/**
	 * Неверный старый пароль
	 */
	incorrectOldPassword: () => LocalizedString
	/**
	 * Неверный пароль
	 */
	incorrectPassword: () => LocalizedString
	/**
	 * Привязать электронную почту
	 */
	linkEmail: () => LocalizedString
	/**
	 * Срок действия токена привязки истёк
	 */
	linkingTokenExpired: () => LocalizedString
	/**
	 * Нет доступа
	 */
	noAccess: () => LocalizedString
	/**
	 * Токен регистрации OAuth не найден
	 */
	oAuthRegistrationTokenNotFound: () => LocalizedString
	/**
	 * Старая и новая электронные почты совпадают
	 */
	oldAndNewEmailsMatch: () => LocalizedString
	/**
	 * Старый и новый пароли совпадают
	 */
	oldAndNewPasswordsMatch: () => LocalizedString
	/**
	 * Пароль не указан
	 */
	passwordIsNotSet: () => LocalizedString
	/**
	 * Сброс пароля
	 */
	passwordReset: () => LocalizedString
	/**
	 * Срок действия токена сброса пароля истёк
	 */
	passwordResetTokenExpired: () => LocalizedString
	/**
	 * Пост с таким ID не найден
	 */
	postWithSuchIdWasNotFound: () => LocalizedString
	/**
	 * Refresh-токен не найден
	 */
	refreshTokenNotFound: () => LocalizedString
	/**
	 * Регистрация
	 */
	registration: () => LocalizedString
	/**
	 * Срок действия токена регистрации истёк
	 */
	registrationTokenExpired: () => LocalizedString
	/**
	 * Сбросить пароль
	 */
	resetPassword: () => LocalizedString
	/**
	 * Роль с таким ID защищена
	 */
	roleWithSuchIdIsProtected: () => LocalizedString
	/**
	 * Роль с таким ID не найдена
	 */
	roleWithSuchIdWasNotFound: () => LocalizedString
	/**
	 * State не совпадают
	 */
	statesDoNotMatch: () => LocalizedString
	/**
	 * Неожиданная ошибка
	 */
	unexpectedError: () => LocalizedString
	/**
	 * Отвязать электронную почту
	 */
	unlinkEmail: () => LocalizedString
	/**
	 * Срок действия токена отвязки истёк
	 */
	unlinkingTokenExpired: () => LocalizedString
	/**
	 * Обновить почту
	 */
	updateEmail: () => LocalizedString
	/**
	 * Обновить электронную почту на <b>{email}</b>
	 */
	updateEmailTo: (arg: { email: unknown }) => LocalizedString
	/**
	 * Поле userData не установлено
	 */
	userDataFieldIsNotSet: () => LocalizedString
	/**
	 * Пользователь с таким адресом электронной почты не найден
	 */
	userWithEmailNotFound: () => LocalizedString
	/**
	 * Пользователь с такой электронной почтой уже существует
	 */
	userWithSuchEmailAlreadyExists: () => LocalizedString
	/**
	 * Пользователь с таким ID уже "{roleName}"
	 */
	userWithSuchIdIsAlready: (arg: { roleName: unknown }) => LocalizedString
	/**
	 * Пользователь с таким ID уже забанен
	 */
	userWithSuchIdIsAlreadyBanned: () => LocalizedString
	/**
	 * Пользователь с таким ID не забанен
	 */
	userWithSuchIdIsNotBanned: () => LocalizedString
	/**
	 * Пользователь с таким ID не найден
	 */
	userWithSuchIdWasNotFound: () => LocalizedString
	/**
	 * Пользователь с таким именем уже существует
	 */
	userWithSuchUsernameAlreadyExists: () => LocalizedString
	/**
	 * К вашему аккаунту уже привязан другой {provider}-аккаунт
	 */
	youAlreadyHaveAccount: (arg: { provider: unknown }) => LocalizedString
	/**
	 * У вас уже есть привязанная электронная почта
	 */
	youAlreadyHaveEmail: () => LocalizedString
	/**
	 * К вашему аккаунту не привязан {provider}-аккаунт
	 */
	youDoNotHaveAccount: (arg: { provider: unknown }) => LocalizedString
	/**
	 * У вас нет аватара
	 */
	youDoNotHaveAvatar: () => LocalizedString
}

export type Formatters = {}
