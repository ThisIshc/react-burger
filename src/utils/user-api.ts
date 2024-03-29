import {getCookie} from "./cookie";
import {API_URL, checkResponse} from "./response";

export function passwordReset(email: string) {
	return fetch(`${API_URL}password-reset`, {
		method: 'post',
		body: JSON.stringify({
			'email': email
		}),
		headers: {
			'Content-Type': 'application/json'
		},
	}).then(res => checkResponse(res))
}

export function resetPassword(data: {password:string, token:string}) {
	return fetch(`${API_URL}password-reset/reset`, {
		method: 'post',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => checkResponse(res))
}

export function userRegistration(userData: {email: string, password: string, name: string}) {
	return fetch(`${API_URL}/auth/register`, {
		method: 'post',
		body: JSON.stringify(userData),
		headers: {
			'Content-Type': 'application/json'
		},
	}).then(res => checkResponse(res))
}

export function userAuth(userData: {email: string, password: string}) {
	return fetch(`${API_URL}/auth/login`, {
		method: 'post',
		body: JSON.stringify(userData),
		headers: {
			'Content-Type': 'application/json'
		},
	}).then(res => checkResponse(res))
}

export function getUser() {
	return fetch(`${API_URL}/auth/user`, {
		method: 'get',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': getCookie('accessToken')
		}
	}).then(res => checkResponse(res))
}

export function updateUser(userData: {email: string, name: string, password: string}) {
	return fetch(`${API_URL}/auth/user`, {
		method: 'PATCH',
		body: JSON.stringify(userData),
		headers: {
			'Content-Type': 'application/json',
			'Authorization': getCookie('accessToken')
		}
	}).then(res => checkResponse(res))
}

export function updateToken() {
	return fetch(`${API_URL}/auth/token`, {
		method: 'POST',
		body: JSON.stringify({token: localStorage.getItem("refreshToken")}),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => checkResponse(res))
}

export function userLogout():Promise<any> {
	return fetch(`${API_URL}/auth/logout`, {
		method: 'POST',
		body: JSON.stringify({token: localStorage.getItem("refreshToken")}),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => checkResponse(res))
}