const API_URL = 'https://norma.nomoreparties.space/api'

export default function getIngredientsApi() {
	return fetch(`${API_URL}/ingredients`)
		.then(res => checkResponse(res))
}

const checkResponse = (res:any) => {
	return res.ok ? res.json() : res.json().then((err:Error) => Promise.reject(err))
}