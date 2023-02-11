const API_URL = 'https://norma.nomoreparties.space/api'

export default function getIngredientsApi() {
	return fetch(`${API_URL}/ingredients`)
		.then(res => checkResponse(res))
}

const checkResponse = res => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}