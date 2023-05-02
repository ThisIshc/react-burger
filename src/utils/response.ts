export const API_URL = 'https://norma.nomoreparties.space/api'

export const TEST_URL = 'http://localhost:3000/'

export const checkResponse = (res:Response) => {
	return res.ok ? res.json() : res.json().then((err: Error) => Promise.reject(err))
}