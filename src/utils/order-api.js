const API_URL = 'https://norma.nomoreparties.space/api'

export default function createOrder(ingredientsId) {
	let data = new FormData()
	data.append('ingredients', ingredientsId)

	return fetch(`${API_URL}/orders`, {
		method: 'post',
		body: JSON.stringify({
			'ingredients': ingredientsId
		}),
		headers: {
			'Content-Type': 'application/json'
		},
	})
		.then(res => checkResponse(res))
}


const checkResponse = res => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}