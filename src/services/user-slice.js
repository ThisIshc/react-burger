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

export const fetchPasswordReset = createAsyncThunk(
	'user/fetchPasswordReset',
	async function(email) {
		return await passwordReset(email)
	}
)

export const fetchResetPassword = createAsyncThunk(
	'user/fetchResetPassword',
	async function(data) {
		return await resetPassword(data)
	}
)

export const fetchUserRegister = createAsyncThunk(
	'user/fetchUserRegister',
	async function(userData) {
		return await userRegistration(userData)
	}
)

export const fetchUserAuth = createAsyncThunk(
	'user/fetchUserAuth',
	async function(userData) {
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
	async function(userData) {
		return await updateUser(userData)
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

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		resetData: null,
		resetPassword: null,
		userData: null,
		errorMessage: ''
	},
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
				setCookie('accessToken', action.payload.accessToken, {"max-age": 1200})
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
				setCookie('accessToken', action.payload.accessToken, {"max-age": 1200})
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
		builder.addCase(fetchGetUser.rejected, (state, action) => {
			state.userData = 'failed'
		})
		builder.addCase(fetchUpdateUser.fulfilled, (state, action) => {
			if (action.payload.success) {
				state.userData = action.payload.user
			} else {
				state.errorMessage = action.payload.message
			}
		})
		builder.addCase(fetchUpdateToken.fulfilled, (state, action) => {
			if (action.payload.success) {
				setCookie('accessToken', action.payload.accessToken, {"max-age": 1200})
				localStorage.setItem('refreshToken', action.payload.refreshToken)
				state.userData = null
			} else {
				state.errorMessage = action.payload.message
			}
		})
		builder.addCase(fetchUpdateToken.rejected, (state, action) => {
			if (action.error.message) {
				setCookie('accessToken', "", {"max-age": -1})
				localStorage.removeItem('refreshToken')
				state.userData = null
			}
		})
		builder.addCase(fetchLogout.fulfilled, (state, action) => {
			if (action.payload.success) {
				setCookie('accessToken', "", {"max-age": -1})
				localStorage.removeItem('refreshToken')
				state.userData = null
			} else {
				state.errorMessage = action.payload.message
			}
		})
	}
})