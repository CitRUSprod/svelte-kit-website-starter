// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'ru'

export type Locales =
	| 'en'
	| 'ru'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	$: {
		$$header: {
			/**
			 * Ч​а​т
			 */
			chat: string
			/**
			 * В​о​й​т​и
			 */
			login: string
			/**
			 * В​ы​й​т​и
			 */
			logout: string
			/**
			 * П​о​с​т​ы
			 */
			posts: string
			/**
			 * П​р​о​ф​и​л​ь
			 */
			profile: string
			/**
			 * Р​о​л​и
			 */
			roles: string
			/**
			 * П​р​о​с​т​о​й​ ​л​э​й​а​у​т
			 */
			simpleLayout: string
			/**
			 * П​о​л​ь​з​о​в​а​т​е​л​и
			 */
			users: string
		}
		$auth: {
			$login: {
				$_provider: {
					$callback: {
						/**
						 * В​ы​ ​у​с​п​е​ш​н​о​ ​в​о​ш​л​и
						 */
						loggedInSuccessfully: string
						/**
						 * В​х​о​д
						 */
						login: string
						/**
						 * П​е​р​е​н​а​п​р​а​в​л​я​е​м​.​.​.
						 */
						redirecting: string
					}
				}
				/**
				 * В​о​й​т​и
				 */
				doLogin: string
				/**
				 * Э​л​е​к​т​р​о​н​н​а​я​ ​п​о​ч​т​а
				 */
				email: string
				/**
				 * З​а​б​ы​л​и​ ​п​а​р​о​л​ь​?
				 */
				forgotPassword: string
				/**
				 * В​ы​ ​у​с​п​е​ш​н​о​ ​в​о​ш​л​и
				 */
				loggedInSuccessfully: string
				/**
				 * В​х​о​д
				 */
				login: string
				/**
				 * и​л​и​ ​в​о​й​т​и​ ​с​ ​п​о​м​о​щ​ь​ю
				 */
				orLoginWith: string
				/**
				 * П​а​р​о​л​ь
				 */
				password: string
				/**
				 * Р​е​г​и​с​т​р​а​ц​и​я
				 */
				registration: string
			}
			$logout: {
				/**
				 * В​ы​ ​у​с​п​е​ш​н​о​ ​в​ы​ш​л​и
				 */
				loggedOutSuccessfully: string
				/**
				 * В​ы​х​о​д
				 */
				logout: string
				/**
				 * П​е​р​е​н​а​п​р​а​в​л​я​е​м​.​.​.
				 */
				redirecting: string
			}
			$registration: {
				$complete: {
					$_token: {
						/**
						 * П​е​р​е​н​а​п​р​а​в​л​я​е​м​.​.​.
						 */
						redirecting: string
						/**
						 * В​ы​ ​у​с​п​е​ш​н​о​ ​з​а​р​е​г​и​с​т​р​и​р​о​в​а​л​и​с​ь
						 */
						registeredSuccessfully: string
						/**
						 * Р​е​г​и​с​т​р​а​ц​и​я
						 */
						registration: string
					}
				}
				$oauth: {
					$_token: {
						/**
						 * З​а​р​е​г​и​с​т​р​и​р​о​в​а​т​ь​с​я
						 */
						register: string
						/**
						 * В​ы​ ​у​с​п​е​ш​н​о​ ​з​а​р​е​г​и​с​т​р​и​р​о​в​а​л​и​с​ь
						 */
						registeredSuccessfully: string
						/**
						 * Р​е​г​и​с​т​р​а​ц​и​я
						 */
						registration: string
						/**
						 * И​м​я​ ​п​о​л​ь​з​о​в​а​т​е​л​я
						 */
						username: string
					}
				}
				/**
				 * П​и​с​ь​м​о​ ​с​ ​п​о​д​т​в​е​р​ж​д​е​н​и​е​м​ ​б​ы​л​о​ ​о​т​п​р​а​в​л​е​н​о​ ​н​а​ ​в​а​ш​ ​а​д​р​е​с​ ​э​л​е​к​т​р​о​н​н​о​й​ ​п​о​ч​т​ы
				 */
				confirmationEmailSent: string
				/**
				 * Э​л​е​к​т​р​о​н​н​а​я​ ​п​о​ч​т​а
				 */
				email: string
				/**
				 * В​х​о​д
				 */
				login: string
				/**
				 * и​л​и​ ​з​а​р​е​г​и​с​т​р​и​р​о​в​а​т​ь​с​я​ ​с​ ​п​о​м​о​щ​ь​ю
				 */
				orRegisterWith: string
				/**
				 * П​а​р​о​л​ь
				 */
				password: string
				/**
				 * П​о​д​т​в​е​р​ж​д​е​н​и​е​ ​п​а​р​о​л​я
				 */
				passwordConfirmation: string
				/**
				 * З​а​р​е​г​и​с​т​р​и​р​о​в​а​т​ь​с​я
				 */
				register: string
				/**
				 * Р​е​г​и​с​т​р​а​ц​и​я
				 */
				registration: string
				/**
				 * И​м​я​ ​п​о​л​ь​з​о​в​а​т​е​л​я
				 */
				username: string
			}
		}
		$chat: {
			/**
			 * Ч​а​т
			 */
			chat: string
		}
		$error: {
			/**
			 * О​ш​и​б​к​а
			 */
			error: string
			/**
			 * Н​а​ ​г​л​а​в​н​у​ю
			 */
			goHome: string
		}
		$posts: {
			$$dialogPostCreating: {
				/**
				 * О​т​м​е​н​а
				 */
				cancel: string
				/**
				 * С​о​д​е​р​ж​а​н​и​е
				 */
				content: string
				/**
				 * С​о​з​д​а​т​ь
				 */
				create: string
				/**
				 * В​в​е​д​и​т​е​ ​с​о​д​е​р​ж​а​н​и​е​.​.​.
				 */
				enterContent: string
				/**
				 * В​в​е​д​и​т​е​ ​з​а​г​о​л​о​в​о​к​.​.​.
				 */
				enterTitle: string
				/**
				 * П​о​с​т​ ​у​с​п​е​ш​н​о​ ​с​о​з​д​а​н
				 */
				postCreatedSuccessfully: string
				/**
				 * С​о​з​д​а​н​и​е​ ​п​о​с​т​а
				 */
				postCreating: string
				/**
				 * З​а​г​о​л​о​в​о​к
				 */
				title: string
			}
			$_id: {
				$$dialogPostEditing: {
					/**
					 * О​т​м​е​н​а
					 */
					cancel: string
					/**
					 * С​о​д​е​р​ж​а​н​и​е
					 */
					content: string
					/**
					 * В​в​е​д​и​т​е​ ​с​о​д​е​р​ж​а​н​и​е​.​.​.
					 */
					enterContent: string
					/**
					 * В​в​е​д​и​т​е​ ​з​а​г​о​л​о​в​о​к​.​.​.
					 */
					enterTitle: string
					/**
					 * П​о​с​т​ ​у​с​п​е​ш​н​о​ ​о​т​р​е​д​а​к​т​и​р​о​в​а​н
					 */
					postEditedSuccessfully: string
					/**
					 * Р​е​д​а​к​т​и​р​о​в​а​н​и​е​ ​п​о​с​т​а
					 */
					postEditing: string
					/**
					 * С​о​х​р​а​н​и​т​ь
					 */
					save: string
					/**
					 * З​а​г​о​л​о​в​о​к
					 */
					title: string
				}
				$$dialogPostRemoving: {
					/**
					 * О​т​м​е​н​а
					 */
					cancel: string
					/**
					 * П​о​с​т​ ​у​с​п​е​ш​н​о​ ​у​д​а​л​ё​н
					 */
					postRemovedSuccessfully: string
					/**
					 * У​д​а​л​е​н​и​е​ ​п​о​с​т​а
					 */
					postRemoving: string
					/**
					 * В​ы​ ​у​в​е​р​е​н​ы​,​ ​ч​т​о​ ​х​о​т​и​т​е​ ​у​д​а​л​и​т​ь​ ​э​т​о​т​ ​п​о​с​т​?
					 */
					postRemovingQuestion: string
					/**
					 * У​д​а​л​и​т​ь
					 */
					remove: string
				}
				/**
				 * А​в​т​о​р
				 */
				author: string
				/**
				 * С​о​з​д​а​н
				 */
				created: string
				/**
				 * Р​е​д​а​к​т​и​р​о​в​а​т​ь
				 */
				edit: string
				/**
				 * О​т​р​е​д​а​к​т​и​р​о​в​а​н
				 */
				edited: string
				/**
				 * У​д​а​л​и​т​ь
				 */
				remove: string
			}
			/**
			 * А​в​т​о​р
			 */
			author: string
			/**
			 * С​о​з​д​а​т​ь​ ​н​о​в​ы​й​ ​п​о​с​т
			 */
			createPost: string
			/**
			 * Д​а​т​а​ ​с​о​з​д​а​н​и​я​ ​(​С​н​а​ч​а​л​а​ ​с​т​а​р​ы​е​)
			 */
			creationDateAsc: string
			/**
			 * Д​а​т​а​ ​с​о​з​д​а​н​и​я​ ​(​С​н​а​ч​а​л​а​ ​н​о​в​ы​е​)
			 */
			creationDateDesc: string
			/**
			 * В​в​е​д​и​т​е​ ​з​а​г​о​л​о​в​о​к​.​.​.
			 */
			enterTitle: string
			/**
			 * П​о​с​т​ы
			 */
			posts: string
			/**
			 * П​о​и​с​к
			 */
			search: string
			/**
			 * С​о​р​т​и​р​о​в​к​а
			 */
			sorting: string
			/**
			 * З​а​г​о​л​о​в​о​к​ ​(​А​-​Я​)
			 */
			titleAsc: string
			/**
			 * З​а​г​о​л​о​в​о​к​ ​(​Я​-​А​)
			 */
			titleDesc: string
		}
		$profile: {
			$email: {
				$from: {
					$_token: {
						/**
						 * П​о​д​т​в​е​р​ж​д​е​н​и​е​ ​с​м​е​н​ы​ ​э​л​е​к​т​р​о​н​н​о​й​ ​п​о​ч​т​ы
						 */
						emailChangeConfirmation: string
						/**
						 * П​и​с​ь​м​о​ ​с​ ​п​о​д​т​в​е​р​ж​д​е​н​и​е​м​ ​б​ы​л​о​ ​о​т​п​р​а​в​л​е​н​о​ ​н​а​ ​в​а​ш​ ​н​о​в​ы​й​ ​а​д​р​е​с​ ​э​л​е​к​т​р​о​н​н​о​й​ ​п​о​ч​т​ы
						 */
						emailChangeConfirmationSent: string
						/**
						 * П​е​р​е​н​а​п​р​а​в​л​я​е​м​.​.​.
						 */
						redirecting: string
					}
				}
				$to: {
					$_token: {
						/**
						 * П​о​д​т​в​е​р​ж​д​е​н​и​е​ ​с​м​е​н​ы​ ​э​л​е​к​т​р​о​н​н​о​й​ ​п​о​ч​т​ы
						 */
						emailChangeConfirmation: string
						/**
						 * Э​л​е​к​т​р​о​н​н​а​я​ ​п​о​ч​т​а​ ​у​с​п​е​ш​н​о​ ​и​з​м​е​н​е​н​а
						 */
						emailChangedSuccessfully: string
						/**
						 * П​е​р​е​н​а​п​р​а​в​л​я​е​м​.​.​.
						 */
						redirecting: string
					}
				}
			}
			$password: {
				$_token: {
					/**
					 * В​в​е​д​и​т​е​ ​н​о​в​ы​й​ ​п​а​р​о​л​ь​.​.​.
					 */
					enterNewPassword: string
					/**
					 * В​в​е​д​и​т​е​ ​н​о​в​ы​й​ ​п​а​р​о​л​ь​ ​с​н​о​в​а​.​.​.
					 */
					enterNewPasswordAgain: string
					/**
					 * Н​о​в​ы​й​ ​п​а​р​о​л​ь
					 */
					newPassword: string
					/**
					 * П​о​д​т​в​е​р​ж​д​е​н​и​е​ ​н​о​в​о​г​о​ ​п​а​р​о​л​я
					 */
					newPasswordConfirmation: string
					/**
					 * С​б​р​о​с​ ​п​а​р​о​л​я
					 */
					passwordReset: string
					/**
					 * П​а​р​о​л​ь​ ​у​с​п​е​ш​н​о​ ​с​б​р​о​ш​е​н
					 */
					passwordResetSuccessfully: string
					/**
					 * С​б​р​о​с​и​т​ь
					 */
					reset: string
				}
				/**
				 * Э​л​е​к​т​р​о​н​н​а​я​ ​п​о​ч​т​а
				 */
				email: string
				/**
				 * В​в​е​д​и​т​е​ ​э​л​е​к​т​р​о​н​н​у​ю​ ​п​о​ч​т​у​.​.​.
				 */
				enterEmail: string
				/**
				 * С​б​р​о​с​ ​п​а​р​о​л​я
				 */
				passwordReset: string
				/**
				 * С​с​ы​л​к​а​ ​н​а​ ​с​б​р​о​с​ ​б​ы​л​а​ ​о​т​п​р​а​в​л​е​н​а​ ​н​а​ ​в​а​ш​ ​а​д​р​е​с​ ​э​л​е​к​т​р​о​н​н​о​й​ ​п​о​ч​т​ы
				 */
				resetLinkSent: string
				/**
				 * О​т​п​р​а​в​и​т​ь​ ​с​с​ы​л​к​у​ ​н​а​ ​с​б​р​о​с
				 */
				sendResetLink: string
			}
		}
		$roles: {
			$$dialogRoleCreating: {
				/**
				 * Д​о​б​а​в​и​т​ь
				 */
				add: string
				/**
				 * О​т​м​е​н​а
				 */
				cancel: string
				/**
				 * С​о​з​д​а​т​ь
				 */
				create: string
				/**
				 * п​у​с​т​о
				 */
				empty: string
				/**
				 * Н​а​з​в​а​н​и​е
				 */
				name: string
				/**
				 * Р​а​з​р​е​ш​е​н​и​е
				 */
				permission: string
				/**
				 * Р​а​з​р​е​ш​е​н​и​я
				 */
				permissions: string
				/**
				 * Р​о​л​ь​ ​у​с​п​е​ш​н​о​ ​с​о​з​д​а​н​а
				 */
				roleCreatedSuccessfully: string
				/**
				 * С​о​з​д​а​н​и​е​ ​р​о​л​и
				 */
				roleCreating: string
			}
			$$dialogRoleEditing: {
				/**
				 * Д​о​б​а​в​и​т​ь
				 */
				add: string
				/**
				 * О​т​м​е​н​а
				 */
				cancel: string
				/**
				 * п​у​с​т​о
				 */
				empty: string
				/**
				 * Н​а​з​в​а​н​и​е
				 */
				name: string
				/**
				 * Р​а​з​р​е​ш​е​н​и​е
				 */
				permission: string
				/**
				 * Р​а​з​р​е​ш​е​н​и​я
				 */
				permissions: string
				/**
				 * Р​о​л​ь​ ​у​с​п​е​ш​н​о​ ​о​т​р​е​д​а​к​т​и​р​о​в​а​н​а
				 */
				roleEditedSuccessfully: string
				/**
				 * Р​е​д​а​к​т​и​р​о​в​а​н​и​е​ ​р​о​л​и
				 */
				roleEditing: string
				/**
				 * С​о​х​р​а​н​и​т​ь
				 */
				save: string
			}
			$$dialogRoleRemoving: {
				/**
				 * О​т​м​е​н​а
				 */
				cancel: string
				/**
				 * У​д​а​л​и​т​ь
				 */
				remove: string
				/**
				 * Р​о​л​ь​ ​у​с​п​е​ш​н​о​ ​у​д​а​л​е​н​а
				 */
				roleRemovedSuccessfully: string
				/**
				 * У​д​а​л​е​н​и​е​ ​р​о​л​и
				 */
				roleRemoving: string
				/**
				 * В​ы​ ​у​в​е​р​е​н​ы​,​ ​ч​т​о​ ​х​о​т​и​т​е​ ​у​д​а​л​и​т​ь​ ​р​о​л​ь​ ​<​b​>​{​{​r​o​l​e​}​}​<​/​b​>​?
				 */
				roleRemovingQuestion: string
			}
			/**
			 * Д​е​й​с​т​в​и​я
			 */
			actions: string
			/**
			 * С​о​з​д​а​т​ь​ ​р​о​л​ь
			 */
			createRole: string
			/**
			 * Р​е​д​а​к​т​и​р​о​в​а​т​ь
			 */
			edit: string
			/**
			 * п​у​с​т​о
			 */
			empty: string
			/**
			 * Н​а​з​в​а​н​и​е
			 */
			name: string
			/**
			 * Р​а​з​р​е​ш​е​н​и​я
			 */
			permissions: string
			/**
			 * У​д​а​л​и​т​ь
			 */
			remove: string
			/**
			 * Р​о​л​и
			 */
			roles: string
		}
		$simpleLayout: {
			/**
			 * Н​а​ ​г​л​а​в​н​у​ю
			 */
			goHome: string
			/**
			 * П​р​о​с​т​о​й​ ​л​э​й​а​у​т
			 */
			simpleLayout: string
		}
		$users: {
			$$dialogRoleAssigning: {
				/**
				 * О​т​м​е​н​а
				 */
				cancel: string
				/**
				 * Р​о​л​ь
				 */
				role: string
				/**
				 * Н​а​з​н​а​ч​е​н​и​е​ ​р​о​л​и
				 */
				roleAssigning: string
				/**
				 * Р​о​л​ь​ ​у​с​п​е​ш​н​о​ ​и​з​м​е​н​е​н​а
				 */
				roleEditedSuccessfully: string
				/**
				 * С​о​х​р​а​н​и​т​ь
				 */
				save: string
				/**
				 * П​о​л​ь​з​о​в​а​т​е​л​ь
				 */
				user: string
			}
			$$dialogUserBanning: {
				/**
				 * З​а​б​а​н​и​т​ь
				 */
				ban: string
				/**
				 * О​т​м​е​н​а
				 */
				cancel: string
				/**
				 * В​в​е​д​и​т​е​ ​п​р​и​ч​и​н​у​.​.​.
				 */
				enterReason: string
				/**
				 * П​р​и​ч​и​н​а
				 */
				reason: string
				/**
				 * П​о​л​ь​з​о​в​а​т​е​л​ь
				 */
				user: string
				/**
				 * П​о​л​ь​з​о​в​а​т​е​л​ь​ ​у​с​п​е​ш​н​о​ ​з​а​б​а​н​е​н
				 */
				userBannedSuccessfully: string
				/**
				 * Б​а​н​ ​п​о​л​ь​з​о​в​а​т​е​л​я
				 */
				userBanning: string
			}
			$_id: {
				$$dialogAvatarRemoving: {
					/**
					 * А​в​а​т​а​р​ ​у​с​п​е​ш​н​о​ ​у​д​а​л​ё​н
					 */
					avatarRemovedSuccessfully: string
					/**
					 * У​д​а​л​е​н​и​е​ ​а​в​а​т​а​р​а
					 */
					avatarRemoving: string
					/**
					 * В​ы​ ​д​е​й​с​т​в​и​т​е​л​ь​н​о​ ​х​о​т​и​т​е​ ​у​д​а​л​и​т​ь​ ​в​а​ш​ ​а​в​а​т​а​р​?
					 */
					avatarRemovingQuestion: string
					/**
					 * О​т​м​е​н​а
					 */
					cancel: string
					/**
					 * У​д​а​л​и​т​ь
					 */
					remove: string
				}
				$$dialogEmailChanging: {
					/**
					 * О​т​м​е​н​а
					 */
					cancel: string
					/**
					 * И​з​м​е​н​и​т​ь
					 */
					change: string
					/**
					 * П​и​с​ь​м​о​ ​с​ ​п​о​д​т​в​е​р​ж​д​е​н​и​е​м​ ​б​ы​л​о​ ​о​т​п​р​а​в​л​е​н​о​ ​н​а​ ​в​а​ш​ ​т​е​к​у​щ​и​й​ ​а​д​р​е​с​ ​э​л​е​к​т​р​о​н​н​о​й​ ​п​о​ч​т​ы
					 */
					confirmationEmailSent: string
					/**
					 * Э​л​е​к​т​р​о​н​н​а​я​ ​п​о​ч​т​а
					 */
					email: string
					/**
					 * И​з​м​е​н​е​н​и​е​ ​э​л​е​к​т​р​о​н​н​о​й​ ​п​о​ч​т​ы
					 */
					emailChanging: string
				}
				$$dialogPasswordChanging: {
					/**
					 * О​т​м​е​н​а
					 */
					cancel: string
					/**
					 * И​з​м​е​н​и​т​ь
					 */
					change: string
					/**
					 * Н​о​в​ы​й​ ​п​а​р​о​л​ь
					 */
					newPassword: string
					/**
					 * С​т​а​р​ы​й​ ​п​а​р​о​л​ь
					 */
					oldPassword: string
					/**
					 * П​а​р​о​л​ь​ ​у​с​п​е​ш​н​о​ ​и​з​м​е​н​ё​н
					 */
					passwordChangedSuccessfully: string
					/**
					 * И​з​м​е​н​е​н​и​е​ ​п​а​р​о​л​я
					 */
					passwordChanging: string
				}
				$$dialogProfileEditing: {
					/**
					 * О​т​м​е​н​а
					 */
					cancel: string
					/**
					 * Э​л​е​к​т​р​о​н​н​а​я​ ​п​о​ч​т​а
					 */
					email: string
					/**
					 * П​р​о​ф​и​л​ь​ ​у​с​п​е​ш​н​о​ ​и​з​м​е​н​ё​н
					 */
					profileEditedSuccessfully: string
					/**
					 * И​з​м​е​н​е​н​и​е​ ​п​р​о​ф​и​л​я
					 */
					profileEditing: string
					/**
					 * С​о​х​р​а​н​и​т​ь
					 */
					save: string
					/**
					 * И​м​я​ ​п​о​л​ь​з​о​в​а​т​е​л​я
					 */
					username: string
				}
				/**
				 * А​в​а​т​а​р
				 */
				avatar: string
				/**
				 * А​в​а​т​а​р​ ​у​с​п​е​ш​н​о​ ​о​б​н​о​в​л​ё​н
				 */
				avatarUpdatedSuccessfully: string
				/**
				 * А​в​т​о​р​ ​б​а​н​а
				 */
				banAuthor: string
				/**
				 * Д​а​т​а​ ​б​а​н​а
				 */
				banDate: string
				/**
				 * З​а​б​а​н​е​н
				 */
				banned: string
				/**
				 * П​р​и​ч​и​н​а​ ​б​а​н​а
				 */
				banReason: string
				/**
				 * И​з​м​е​н​и​т​ь​ ​э​л​е​к​т​р​о​н​н​у​ю​ ​п​о​ч​т​у
				 */
				changeEmail: string
				/**
				 * И​з​м​е​н​и​т​ь​ ​п​а​р​о​л​ь
				 */
				changePassword: string
				/**
				 * П​и​с​ь​м​о​ ​с​ ​п​о​д​т​в​е​р​ж​д​е​н​и​е​м​ ​б​ы​л​о​ ​о​т​п​р​а​в​л​е​н​о​ ​н​а​ ​в​а​ш​ ​а​д​р​е​с​ ​э​л​е​к​т​р​о​н​н​о​й​ ​п​о​ч​т​ы
				 */
				confirmationEmailSent: string
				/**
				 * Р​е​д​а​к​т​и​р​о​в​а​т​ь
				 */
				edit: string
				/**
				 * Э​л​е​к​т​р​о​н​н​а​я​ ​п​о​ч​т​а
				 */
				email: string
				/**
				 * Н​е​т
				 */
				no: string
				/**
				 * П​р​о​ф​и​л​ь
				 */
				profile: string
				/**
				 * Д​а​т​а​ ​р​е​г​и​с​т​р​а​ц​и​и
				 */
				registrationDate: string
				/**
				 * У​д​а​л​и​т​ь​ ​а​в​а​т​а​р
				 */
				removeAvatar: string
				/**
				 * Р​о​л​ь
				 */
				role: string
				/**
				 * З​а​г​р​у​з​и​т​ь​ ​а​в​а​т​а​р
				 */
				uploadAvatar: string
				/**
				 * И​м​я​ ​п​о​л​ь​з​о​в​а​т​е​л​я
				 */
				username: string
				/**
				 * Д​а
				 */
				yes: string
			}
			/**
			 * Д​е​й​с​т​в​и​я
			 */
			actions: string
			/**
			 * Н​а​з​н​а​ч​и​т​ь​ ​р​о​л​ь
			 */
			assignRole: string
			/**
			 * А​в​а​т​а​р
			 */
			avatar: string
			/**
			 * З​а​б​а​н​и​т​ь
			 */
			ban: string
			/**
			 * З​а​б​а​н​е​н
			 */
			banned: string
			/**
			 * П​о​д​т​в​е​р​ж​д​ё​н​н​а​я​ ​э​л​е​к​т​р​о​н​н​а​я​ ​п​о​ч​т​а
			 */
			confirmedEmail: string
			/**
			 * Э​л​е​к​т​р​о​н​н​а​я​ ​п​о​ч​т​а
			 */
			email: string
			/**
			 * Н​е​т
			 */
			no: string
			/**
			 * О​т​к​р​ы​т​ь
			 */
			open: string
			/**
			 * П​р​и​ч​и​н​а
			 */
			reason: string
			/**
			 * Д​а​т​а​ ​р​е​г​и​с​т​р​а​ц​и​и
			 */
			registrationDate: string
			/**
			 * Р​о​л​ь
			 */
			role: string
			/**
			 * Р​а​з​б​а​н​и​т​ь
			 */
			unban: string
			/**
			 * И​м​я​ ​п​о​л​ь​з​о​в​а​т​е​л​я
			 */
			username: string
			/**
			 * П​о​л​ь​з​о​в​а​т​е​л​и
			 */
			users: string
			/**
			 * П​о​л​ь​з​о​в​а​т​е​л​ь​ ​у​с​п​е​ш​н​о​ ​р​а​з​б​а​н​е​н
			 */
			userUnbannedSuccessfully: string
			/**
			 * К​т​о
			 */
			who: string
			/**
			 * Д​а
			 */
			yes: string
		}
		/**
		 * К​л​и​к​о​в
		 */
		clicked: string
		/**
		 * К​о​л​и​ч​е​с​т​в​о
		 */
		count: string
		/**
		 * Г​л​а​в​н​а​я
		 */
		home: string
		/**
		 * С​л​у​ч​а​й​н​о​е​ ​ч​и​с​л​о
		 */
		randomNumber: string
	}
	$$alert: {
		/**
		 * О​ш​и​б​к​а
		 */
		error: string
		/**
		 * И​н​ф​о​р​м​а​ц​и​я
		 */
		info: string
		/**
		 * У​с​п​е​х
		 */
		success: string
		/**
		 * П​р​е​д​у​п​р​е​ж​д​е​н​и​е
		 */
		warning: string
	}
	$$chat: {
		/**
		 * С​о​о​б​щ​е​н​и​е
		 */
		message: string
		/**
		 * О​т​п​р​а​в​и​т​ь
		 */
		send: string
	}
	/**
	 * П​р​о​и​з​о​ш​л​а​ ​о​ш​и​б​к​а
	 */
	errorOccurred: string
}

export type TranslationFunctions = {
	$: {
		$$header: {
			/**
			 * Чат
			 */
			chat: () => LocalizedString
			/**
			 * Войти
			 */
			login: () => LocalizedString
			/**
			 * Выйти
			 */
			logout: () => LocalizedString
			/**
			 * Посты
			 */
			posts: () => LocalizedString
			/**
			 * Профиль
			 */
			profile: () => LocalizedString
			/**
			 * Роли
			 */
			roles: () => LocalizedString
			/**
			 * Простой лэйаут
			 */
			simpleLayout: () => LocalizedString
			/**
			 * Пользователи
			 */
			users: () => LocalizedString
		}
		$auth: {
			$login: {
				$_provider: {
					$callback: {
						/**
						 * Вы успешно вошли
						 */
						loggedInSuccessfully: () => LocalizedString
						/**
						 * Вход
						 */
						login: () => LocalizedString
						/**
						 * Перенаправляем...
						 */
						redirecting: () => LocalizedString
					}
				}
				/**
				 * Войти
				 */
				doLogin: () => LocalizedString
				/**
				 * Электронная почта
				 */
				email: () => LocalizedString
				/**
				 * Забыли пароль?
				 */
				forgotPassword: () => LocalizedString
				/**
				 * Вы успешно вошли
				 */
				loggedInSuccessfully: () => LocalizedString
				/**
				 * Вход
				 */
				login: () => LocalizedString
				/**
				 * или войти с помощью
				 */
				orLoginWith: () => LocalizedString
				/**
				 * Пароль
				 */
				password: () => LocalizedString
				/**
				 * Регистрация
				 */
				registration: () => LocalizedString
			}
			$logout: {
				/**
				 * Вы успешно вышли
				 */
				loggedOutSuccessfully: () => LocalizedString
				/**
				 * Выход
				 */
				logout: () => LocalizedString
				/**
				 * Перенаправляем...
				 */
				redirecting: () => LocalizedString
			}
			$registration: {
				$complete: {
					$_token: {
						/**
						 * Перенаправляем...
						 */
						redirecting: () => LocalizedString
						/**
						 * Вы успешно зарегистрировались
						 */
						registeredSuccessfully: () => LocalizedString
						/**
						 * Регистрация
						 */
						registration: () => LocalizedString
					}
				}
				$oauth: {
					$_token: {
						/**
						 * Зарегистрироваться
						 */
						register: () => LocalizedString
						/**
						 * Вы успешно зарегистрировались
						 */
						registeredSuccessfully: () => LocalizedString
						/**
						 * Регистрация
						 */
						registration: () => LocalizedString
						/**
						 * Имя пользователя
						 */
						username: () => LocalizedString
					}
				}
				/**
				 * Письмо с подтверждением было отправлено на ваш адрес электронной почты
				 */
				confirmationEmailSent: () => LocalizedString
				/**
				 * Электронная почта
				 */
				email: () => LocalizedString
				/**
				 * Вход
				 */
				login: () => LocalizedString
				/**
				 * или зарегистрироваться с помощью
				 */
				orRegisterWith: () => LocalizedString
				/**
				 * Пароль
				 */
				password: () => LocalizedString
				/**
				 * Подтверждение пароля
				 */
				passwordConfirmation: () => LocalizedString
				/**
				 * Зарегистрироваться
				 */
				register: () => LocalizedString
				/**
				 * Регистрация
				 */
				registration: () => LocalizedString
				/**
				 * Имя пользователя
				 */
				username: () => LocalizedString
			}
		}
		$chat: {
			/**
			 * Чат
			 */
			chat: () => LocalizedString
		}
		$error: {
			/**
			 * Ошибка
			 */
			error: () => LocalizedString
			/**
			 * На главную
			 */
			goHome: () => LocalizedString
		}
		$posts: {
			$$dialogPostCreating: {
				/**
				 * Отмена
				 */
				cancel: () => LocalizedString
				/**
				 * Содержание
				 */
				content: () => LocalizedString
				/**
				 * Создать
				 */
				create: () => LocalizedString
				/**
				 * Введите содержание...
				 */
				enterContent: () => LocalizedString
				/**
				 * Введите заголовок...
				 */
				enterTitle: () => LocalizedString
				/**
				 * Пост успешно создан
				 */
				postCreatedSuccessfully: () => LocalizedString
				/**
				 * Создание поста
				 */
				postCreating: () => LocalizedString
				/**
				 * Заголовок
				 */
				title: () => LocalizedString
			}
			$_id: {
				$$dialogPostEditing: {
					/**
					 * Отмена
					 */
					cancel: () => LocalizedString
					/**
					 * Содержание
					 */
					content: () => LocalizedString
					/**
					 * Введите содержание...
					 */
					enterContent: () => LocalizedString
					/**
					 * Введите заголовок...
					 */
					enterTitle: () => LocalizedString
					/**
					 * Пост успешно отредактирован
					 */
					postEditedSuccessfully: () => LocalizedString
					/**
					 * Редактирование поста
					 */
					postEditing: () => LocalizedString
					/**
					 * Сохранить
					 */
					save: () => LocalizedString
					/**
					 * Заголовок
					 */
					title: () => LocalizedString
				}
				$$dialogPostRemoving: {
					/**
					 * Отмена
					 */
					cancel: () => LocalizedString
					/**
					 * Пост успешно удалён
					 */
					postRemovedSuccessfully: () => LocalizedString
					/**
					 * Удаление поста
					 */
					postRemoving: () => LocalizedString
					/**
					 * Вы уверены, что хотите удалить этот пост?
					 */
					postRemovingQuestion: () => LocalizedString
					/**
					 * Удалить
					 */
					remove: () => LocalizedString
				}
				/**
				 * Автор
				 */
				author: () => LocalizedString
				/**
				 * Создан
				 */
				created: () => LocalizedString
				/**
				 * Редактировать
				 */
				edit: () => LocalizedString
				/**
				 * Отредактирован
				 */
				edited: () => LocalizedString
				/**
				 * Удалить
				 */
				remove: () => LocalizedString
			}
			/**
			 * Автор
			 */
			author: () => LocalizedString
			/**
			 * Создать новый пост
			 */
			createPost: () => LocalizedString
			/**
			 * Дата создания (Сначала старые)
			 */
			creationDateAsc: () => LocalizedString
			/**
			 * Дата создания (Сначала новые)
			 */
			creationDateDesc: () => LocalizedString
			/**
			 * Введите заголовок...
			 */
			enterTitle: () => LocalizedString
			/**
			 * Посты
			 */
			posts: () => LocalizedString
			/**
			 * Поиск
			 */
			search: () => LocalizedString
			/**
			 * Сортировка
			 */
			sorting: () => LocalizedString
			/**
			 * Заголовок (А-Я)
			 */
			titleAsc: () => LocalizedString
			/**
			 * Заголовок (Я-А)
			 */
			titleDesc: () => LocalizedString
		}
		$profile: {
			$email: {
				$from: {
					$_token: {
						/**
						 * Подтверждение смены электронной почты
						 */
						emailChangeConfirmation: () => LocalizedString
						/**
						 * Письмо с подтверждением было отправлено на ваш новый адрес электронной почты
						 */
						emailChangeConfirmationSent: () => LocalizedString
						/**
						 * Перенаправляем...
						 */
						redirecting: () => LocalizedString
					}
				}
				$to: {
					$_token: {
						/**
						 * Подтверждение смены электронной почты
						 */
						emailChangeConfirmation: () => LocalizedString
						/**
						 * Электронная почта успешно изменена
						 */
						emailChangedSuccessfully: () => LocalizedString
						/**
						 * Перенаправляем...
						 */
						redirecting: () => LocalizedString
					}
				}
			}
			$password: {
				$_token: {
					/**
					 * Введите новый пароль...
					 */
					enterNewPassword: () => LocalizedString
					/**
					 * Введите новый пароль снова...
					 */
					enterNewPasswordAgain: () => LocalizedString
					/**
					 * Новый пароль
					 */
					newPassword: () => LocalizedString
					/**
					 * Подтверждение нового пароля
					 */
					newPasswordConfirmation: () => LocalizedString
					/**
					 * Сброс пароля
					 */
					passwordReset: () => LocalizedString
					/**
					 * Пароль успешно сброшен
					 */
					passwordResetSuccessfully: () => LocalizedString
					/**
					 * Сбросить
					 */
					reset: () => LocalizedString
				}
				/**
				 * Электронная почта
				 */
				email: () => LocalizedString
				/**
				 * Введите электронную почту...
				 */
				enterEmail: () => LocalizedString
				/**
				 * Сброс пароля
				 */
				passwordReset: () => LocalizedString
				/**
				 * Ссылка на сброс была отправлена на ваш адрес электронной почты
				 */
				resetLinkSent: () => LocalizedString
				/**
				 * Отправить ссылку на сброс
				 */
				sendResetLink: () => LocalizedString
			}
		}
		$roles: {
			$$dialogRoleCreating: {
				/**
				 * Добавить
				 */
				add: () => LocalizedString
				/**
				 * Отмена
				 */
				cancel: () => LocalizedString
				/**
				 * Создать
				 */
				create: () => LocalizedString
				/**
				 * пусто
				 */
				empty: () => LocalizedString
				/**
				 * Название
				 */
				name: () => LocalizedString
				/**
				 * Разрешение
				 */
				permission: () => LocalizedString
				/**
				 * Разрешения
				 */
				permissions: () => LocalizedString
				/**
				 * Роль успешно создана
				 */
				roleCreatedSuccessfully: () => LocalizedString
				/**
				 * Создание роли
				 */
				roleCreating: () => LocalizedString
			}
			$$dialogRoleEditing: {
				/**
				 * Добавить
				 */
				add: () => LocalizedString
				/**
				 * Отмена
				 */
				cancel: () => LocalizedString
				/**
				 * пусто
				 */
				empty: () => LocalizedString
				/**
				 * Название
				 */
				name: () => LocalizedString
				/**
				 * Разрешение
				 */
				permission: () => LocalizedString
				/**
				 * Разрешения
				 */
				permissions: () => LocalizedString
				/**
				 * Роль успешно отредактирована
				 */
				roleEditedSuccessfully: () => LocalizedString
				/**
				 * Редактирование роли
				 */
				roleEditing: () => LocalizedString
				/**
				 * Сохранить
				 */
				save: () => LocalizedString
			}
			$$dialogRoleRemoving: {
				/**
				 * Отмена
				 */
				cancel: () => LocalizedString
				/**
				 * Удалить
				 */
				remove: () => LocalizedString
				/**
				 * Роль успешно удалена
				 */
				roleRemovedSuccessfully: () => LocalizedString
				/**
				 * Удаление роли
				 */
				roleRemoving: () => LocalizedString
				/**
				 * Вы уверены, что хотите удалить роль <b>{{role}}</b>?
				 */
				roleRemovingQuestion: (arg0: number | string | boolean) => LocalizedString
			}
			/**
			 * Действия
			 */
			actions: () => LocalizedString
			/**
			 * Создать роль
			 */
			createRole: () => LocalizedString
			/**
			 * Редактировать
			 */
			edit: () => LocalizedString
			/**
			 * пусто
			 */
			empty: () => LocalizedString
			/**
			 * Название
			 */
			name: () => LocalizedString
			/**
			 * Разрешения
			 */
			permissions: () => LocalizedString
			/**
			 * Удалить
			 */
			remove: () => LocalizedString
			/**
			 * Роли
			 */
			roles: () => LocalizedString
		}
		$simpleLayout: {
			/**
			 * На главную
			 */
			goHome: () => LocalizedString
			/**
			 * Простой лэйаут
			 */
			simpleLayout: () => LocalizedString
		}
		$users: {
			$$dialogRoleAssigning: {
				/**
				 * Отмена
				 */
				cancel: () => LocalizedString
				/**
				 * Роль
				 */
				role: () => LocalizedString
				/**
				 * Назначение роли
				 */
				roleAssigning: () => LocalizedString
				/**
				 * Роль успешно изменена
				 */
				roleEditedSuccessfully: () => LocalizedString
				/**
				 * Сохранить
				 */
				save: () => LocalizedString
				/**
				 * Пользователь
				 */
				user: () => LocalizedString
			}
			$$dialogUserBanning: {
				/**
				 * Забанить
				 */
				ban: () => LocalizedString
				/**
				 * Отмена
				 */
				cancel: () => LocalizedString
				/**
				 * Введите причину...
				 */
				enterReason: () => LocalizedString
				/**
				 * Причина
				 */
				reason: () => LocalizedString
				/**
				 * Пользователь
				 */
				user: () => LocalizedString
				/**
				 * Пользователь успешно забанен
				 */
				userBannedSuccessfully: () => LocalizedString
				/**
				 * Бан пользователя
				 */
				userBanning: () => LocalizedString
			}
			$_id: {
				$$dialogAvatarRemoving: {
					/**
					 * Аватар успешно удалён
					 */
					avatarRemovedSuccessfully: () => LocalizedString
					/**
					 * Удаление аватара
					 */
					avatarRemoving: () => LocalizedString
					/**
					 * Вы действительно хотите удалить ваш аватар?
					 */
					avatarRemovingQuestion: () => LocalizedString
					/**
					 * Отмена
					 */
					cancel: () => LocalizedString
					/**
					 * Удалить
					 */
					remove: () => LocalizedString
				}
				$$dialogEmailChanging: {
					/**
					 * Отмена
					 */
					cancel: () => LocalizedString
					/**
					 * Изменить
					 */
					change: () => LocalizedString
					/**
					 * Письмо с подтверждением было отправлено на ваш текущий адрес электронной почты
					 */
					confirmationEmailSent: () => LocalizedString
					/**
					 * Электронная почта
					 */
					email: () => LocalizedString
					/**
					 * Изменение электронной почты
					 */
					emailChanging: () => LocalizedString
				}
				$$dialogPasswordChanging: {
					/**
					 * Отмена
					 */
					cancel: () => LocalizedString
					/**
					 * Изменить
					 */
					change: () => LocalizedString
					/**
					 * Новый пароль
					 */
					newPassword: () => LocalizedString
					/**
					 * Старый пароль
					 */
					oldPassword: () => LocalizedString
					/**
					 * Пароль успешно изменён
					 */
					passwordChangedSuccessfully: () => LocalizedString
					/**
					 * Изменение пароля
					 */
					passwordChanging: () => LocalizedString
				}
				$$dialogProfileEditing: {
					/**
					 * Отмена
					 */
					cancel: () => LocalizedString
					/**
					 * Электронная почта
					 */
					email: () => LocalizedString
					/**
					 * Профиль успешно изменён
					 */
					profileEditedSuccessfully: () => LocalizedString
					/**
					 * Изменение профиля
					 */
					profileEditing: () => LocalizedString
					/**
					 * Сохранить
					 */
					save: () => LocalizedString
					/**
					 * Имя пользователя
					 */
					username: () => LocalizedString
				}
				/**
				 * Аватар
				 */
				avatar: () => LocalizedString
				/**
				 * Аватар успешно обновлён
				 */
				avatarUpdatedSuccessfully: () => LocalizedString
				/**
				 * Автор бана
				 */
				banAuthor: () => LocalizedString
				/**
				 * Дата бана
				 */
				banDate: () => LocalizedString
				/**
				 * Забанен
				 */
				banned: () => LocalizedString
				/**
				 * Причина бана
				 */
				banReason: () => LocalizedString
				/**
				 * Изменить электронную почту
				 */
				changeEmail: () => LocalizedString
				/**
				 * Изменить пароль
				 */
				changePassword: () => LocalizedString
				/**
				 * Письмо с подтверждением было отправлено на ваш адрес электронной почты
				 */
				confirmationEmailSent: () => LocalizedString
				/**
				 * Редактировать
				 */
				edit: () => LocalizedString
				/**
				 * Электронная почта
				 */
				email: () => LocalizedString
				/**
				 * Нет
				 */
				no: () => LocalizedString
				/**
				 * Профиль
				 */
				profile: () => LocalizedString
				/**
				 * Дата регистрации
				 */
				registrationDate: () => LocalizedString
				/**
				 * Удалить аватар
				 */
				removeAvatar: () => LocalizedString
				/**
				 * Роль
				 */
				role: () => LocalizedString
				/**
				 * Загрузить аватар
				 */
				uploadAvatar: () => LocalizedString
				/**
				 * Имя пользователя
				 */
				username: () => LocalizedString
				/**
				 * Да
				 */
				yes: () => LocalizedString
			}
			/**
			 * Действия
			 */
			actions: () => LocalizedString
			/**
			 * Назначить роль
			 */
			assignRole: () => LocalizedString
			/**
			 * Аватар
			 */
			avatar: () => LocalizedString
			/**
			 * Забанить
			 */
			ban: () => LocalizedString
			/**
			 * Забанен
			 */
			banned: () => LocalizedString
			/**
			 * Подтверждённая электронная почта
			 */
			confirmedEmail: () => LocalizedString
			/**
			 * Электронная почта
			 */
			email: () => LocalizedString
			/**
			 * Нет
			 */
			no: () => LocalizedString
			/**
			 * Открыть
			 */
			open: () => LocalizedString
			/**
			 * Причина
			 */
			reason: () => LocalizedString
			/**
			 * Дата регистрации
			 */
			registrationDate: () => LocalizedString
			/**
			 * Роль
			 */
			role: () => LocalizedString
			/**
			 * Разбанить
			 */
			unban: () => LocalizedString
			/**
			 * Имя пользователя
			 */
			username: () => LocalizedString
			/**
			 * Пользователи
			 */
			users: () => LocalizedString
			/**
			 * Пользователь успешно разбанен
			 */
			userUnbannedSuccessfully: () => LocalizedString
			/**
			 * Кто
			 */
			who: () => LocalizedString
			/**
			 * Да
			 */
			yes: () => LocalizedString
		}
		/**
		 * Кликов
		 */
		clicked: () => LocalizedString
		/**
		 * Количество
		 */
		count: () => LocalizedString
		/**
		 * Главная
		 */
		home: () => LocalizedString
		/**
		 * Случайное число
		 */
		randomNumber: () => LocalizedString
	}
	$$alert: {
		/**
		 * Ошибка
		 */
		error: () => LocalizedString
		/**
		 * Информация
		 */
		info: () => LocalizedString
		/**
		 * Успех
		 */
		success: () => LocalizedString
		/**
		 * Предупреждение
		 */
		warning: () => LocalizedString
	}
	$$chat: {
		/**
		 * Сообщение
		 */
		message: () => LocalizedString
		/**
		 * Отправить
		 */
		send: () => LocalizedString
	}
	/**
	 * Произошла ошибка
	 */
	errorOccurred: () => LocalizedString
}

export type Formatters = {}