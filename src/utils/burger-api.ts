import {API_URL, checkResponse} from "./response";

export default function getIngredientsApi() {
	return fetch(`${API_URL}/ingredients`)
		.then(res => checkResponse(res))
}