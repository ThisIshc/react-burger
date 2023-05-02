import {
	getUser,
	passwordReset, resetPassword,
	updateToken,
	updateUser,
	userAuth,
	userLogout,
	userRegistration
} from "../utils/user-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setCookie} from "../utils/cookie";
import {TUserDataResponse, TUserResetData, TUserResetPassword} from "../types/user";

export const fetchPasswordReset = createAsyncThunk(
	'user/fetchPasswordReset',
	async function(email:string) {
		return await passwordReset(email)
	}
)

export const fetchResetPassword = createAsyncThunk(
	'user/fetchResetPassword',
	async function(data: {password:string, token:string}) {
		return await resetPassword(data)
	}
)

export const fetchUserRegister = createAsyncThunk(
	'user/fetchUserRegister',
	async function(userData: {email: string, password: string, name: string}) {
		return await userRegistration(userData)
	}
)

export const fetchUserAuth = createAsyncThunk(
	'user/fetchUserAuth',
	async function(userData: {email: string, password: string}) {
		return await userAuth(userData)
	}
)

export const fetchGetUser = createAsyncThunk(
	'user/fetchGetUser',
	async function() {
		return await getUser()
	}
)

export const fetchUpdateUser = createAsyncThunk(
	'user/fetchUpdateUser',
	async function(userData: {email: string, name: string, password: string}) {
		try {
			return await updateUser(userData)
		} catch (err) {
			const refreshToken = await updateToken()
			setCookie('accessToken', refreshToken.accessToken, {"max-age": 1200, "path": "/"})
			return await updateUser(userData)
		}
	}
)

export const fetchUpdateToken = createAsyncThunk(
	'user/fetchUpdateToken',
	async function() {
		return await updateToken()
	}
)

export const fetchLogout = createAsyncThunk(
	'user/fetchLogout',
	async function() {
		return await userLogout()
	}
)

interface IInitialState {
	userData: TUserDataResponse | null,
	resetData: TUserResetData | null,
	resetPassword: TUserResetPassword | null,
	errorMessage?: string
}

export const initialState:IInitialState = {
	resetData: null,
	resetPassword: null,
	userData: null,
	errorMessage: ''
}

export const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(fetchPasswordReset.fulfilled, (state, action) => {
			state.resetData = action.payload
		})
		builder.addCase(fetchResetPassword.fulfilled, (state, action) => {
			state.resetPassword = action.payload
		})
		builder.addCase(fetchUserRegister.fulfilled, (state, action) => {
			if (action.payload.success) {
				state.userData = action.payload.user
				setCookie('accessToken', action.payload.accessToken, {"max-age": 1200, "path": "/"})
				localStorage.setItem('refreshToken', action.payload.refreshToken)
			} else {
				state.errorMessage = action.payload.message
			}
		})
		builder.addCase(fetchUserRegister.rejected, (state, action) => {
			if (action.error.message) {
				state.errorMessage = action.error.message
			}
		})
		builder.addCase(fetchUserAuth.fulfilled, (state, action) => {
			if (action.payload.success) {
				state.userData = action.payload.user
				setCookie('accessToken', action.payload.accessToken, {"max-age": 1200, "path": "/"})
				localStorage.setItem('refreshToken', action.payload.refreshToken)
			} else {
				state.errorMessage = action.payload.message
			}
		})
		builder.addCase(fetchUserAuth.rejected, (state, action) => {
			if (action.error.message) {
				state.errorMessage = action.error.message
			}
		})
		builder.addCase(fetchGetUser.fulfilled, (state, action) => {
			if (action.payload.success) {
				state.userData = action.payload.user
			} else {
				state.errorMessage = action.payload.message
			}
		})
		builder.addCase(fetchGetUser.rejected, (state) => {
			state.userData = null
		})
		builder.addCase(fetchUpdateUser.fulfilled, (state, action) => {
			if (action.payload) {
				if (action.payload.success) {
					state.userData = action.payload.user
				} else {
					state.errorMessage = action.payload.message
				}
			}
		})
		builder.addCase(fetchUpdateToken.fulfilled, (state, action) => {
			if (action.payload.success) {
				setCookie('accessToken', action.payload.accessToken, {"max-age": 1200, "path": "/"})
				localStorage.setItem('refreshToken', action.payload.refreshToken)
				state.userData = null
			} else {
				state.errorMessage = action.payload.message
			}
		})
		builder.addCase(fetchUpdateToken.rejected, (state, action) => {
			if (action.error.message) {
				setCookie('accessToken', "", {"max-age": -1, "path": "/"})
				localStorage.removeItem('refreshToken')
				state.userData = null
			}
		})
		builder.addCase(fetchLogout.fulfilled, (state, action) => {
			if (action.payload.success) {
				setCookie('accessToken', "", {"max-age": -1, "path": "/"})
				localStorage.removeItem('refreshToken')
				state.userData = null
			} else {
				state.errorMessage = action.payload.message
			}
		})
	}
})