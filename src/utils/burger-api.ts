import {checkResponse} from "./response";

const API_URL = 'https://norma.nomoreparties.space/api'

export default function getIngredientsApi() {
	return fetch(`${API_URL}/ingredients`)
		.then(res => checkResponse(res))
}