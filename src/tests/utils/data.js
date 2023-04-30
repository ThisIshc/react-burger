import {v4 as uuidv4} from "uuid";

export const ingredientData = {
	ingredient: {
		calories: 4242,
		carbohydrates: 242,
		fat: 142,
		image: "https://code.s3.yandex.net/react/code/meat-01.png",
		image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
		image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
		name: "Биокотлета из марсианской Магнолии",
		price: 424,
		proteins: 420,
		type: "main",
		__v: 0,
		_id: "643d69a5c3f7b9001cfa0941"
	}
}

export const product_1 = {
	_id:"643d69a5c3f7b9001cfa093c",
	id:"643d69a5c3f7b9001cfa093c",
	image:"https://code.s3.yandex.net/react/code/bun-02.png",
	name:"Краторная булка N-200i",
	price:1255,
	type:"bun",
	dragId: uuidv4()
}
export const product_2 = {
	_id:"643d69a5c3f7b9001cfa093e",
	id:"643d69a5c3f7b9001cfa093e",
	image:"https://code.s3.yandex.net/react/code/meat-03.png",
	name:"Филе Люминесцентного тетраодонтимформа",
	price:988,
	type:"main",
	dragId: uuidv4()
}
export const product_3 = {
	_id:"643d69a5c3f7b9001cfa0941",
	id:"643d69a5c3f7b9001cfa0941",
	image:"https://code.s3.yandex.net/react/code/meat-01.png",
	name:"Биокотлета из марсианской Магнолии",
	price:424,
	type:"main",
	dragId: uuidv4()
}

export const bun = {
	_id:"643d69a5c3f7b9001cfa093c",
	id:"643d69a5c3f7b9001cfa093c",
	image:"https://code.s3.yandex.net/react/code/bun-02.png",
	name:"Краторная булка N-200i",
	price:1255,
	type:"bun",
	dragId: uuidv4()
}
export const feed = {
	"_id": "644e18ba45c6f2001be6f029",
	"ingredients": [
		"643d69a5c3f7b9001cfa093d",
		"643d69a5c3f7b9001cfa0943",
		"643d69a5c3f7b9001cfa093d"
	],
	"status": "done",
	"name": "Space флюоресцентный бургер",
	"createdAt": "2023-04-30T07:28:58.820Z",
	"updatedAt": "2023-04-30T07:28:58.856Z",
	"number": 2241
}

export const order = {
	"ingredients": [
		{
			"_id": "643d69a5c3f7b9001cfa093e",
			"name": "Филе Люминесцентного тетраодонтимформа",
			"type": "main",
			"proteins": 44,
			"fat": 26,
			"carbohydrates": 85,
			"calories": 643,
			"price": 988,
			"image": "https://code.s3.yandex.net/react/code/meat-03.png",
			"image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
			"image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
			"__v": 0
		},
		{
			"_id": "643d69a5c3f7b9001cfa0941",
			"name": "Биокотлета из марсианской Магнолии",
			"type": "main",
			"proteins": 420,
			"fat": 142,
			"carbohydrates": 242,
			"calories": 4242,
			"price": 424,
			"image": "https://code.s3.yandex.net/react/code/meat-01.png",
			"image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
			"image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
			"__v": 0
		},
		{
			"_id": "643d69a5c3f7b9001cfa093d",
			"name": "Флюоресцентная булка R2-D3",
			"type": "bun",
			"proteins": 44,
			"fat": 26,
			"carbohydrates": 85,
			"calories": 643,
			"price": 988,
			"image": "https://code.s3.yandex.net/react/code/bun-01.png",
			"image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
			"image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
			"__v": 0
		},
		{
			"_id": "643d69a5c3f7b9001cfa093d",
			"name": "Флюоресцентная булка R2-D3",
			"type": "bun",
			"proteins": 44,
			"fat": 26,
			"carbohydrates": 85,
			"calories": 643,
			"price": 988,
			"image": "https://code.s3.yandex.net/react/code/bun-01.png",
			"image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
			"image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
			"__v": 0
		}
	],
	"_id": "644d0e1645c6f2001be6ec23",
	"owner": {
		"name": "Andrey",
		"email": "andreyy.bayandin@yandex.ru",
		"createdAt": "2023-04-18T05:24:03.068Z",
		"updatedAt": "2023-04-18T05:24:03.068Z"
	},
	"status": "done",
	"name": "Био-марсианский люминесцентный флюоресцентный бургер",
	"createdAt": "2023-04-29T12:31:18.667Z",
	"updatedAt": "2023-04-29T12:31:18.766Z",
	"number": 2184,
	"price": 3388
}