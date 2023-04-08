export type TUserResetData = {
	success: boolean,
	message: string
}
export type TUserResetPassword = {
	success: boolean,
	message: string
}
export type TUserDataResponse = {
	email: string,
	name: string
}

export type TUserData = {
	resetData: TUserResetData,
	resetPassword: TUserResetPassword,
	userData: TUserDataResponse,
	errorMessage?: string
}

export interface IUserData {
	user: TUserData
}