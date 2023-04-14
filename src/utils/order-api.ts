import {checkResponse} from "./response";
import {getCookie} from "./cookie";

const API_URL = 'https://norma.nomoreparties.space/api'

export default function createOrder(ingredientsId: string[]) {
	return fetch(`${API_URL}/orders`, {
		method: 'post',
		body: JSON.stringify({
			'ingredients': ingredientsId,
		}),
		headers: {
			'Content-Type': 'application/json',
			'Authorization': getCookie('accessToken')
		},
	})
		.then(res => checkResponse(res))
}