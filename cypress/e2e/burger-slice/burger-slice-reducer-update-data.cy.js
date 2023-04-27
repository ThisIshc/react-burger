import {updateData, updateTabs} from "../../../src/services/burger-slice";

describe('test burger slice reducers', () => {
	before(function () {
		cy.visit('http://localhost:3000/')
	})
	it('test updateData', () => {
		const products = [
			{
				dragId: "9bceebf1-4452-4c8d-9c07-dcc0654c42bf",
				id: "643d69a5c3f7b9001cfa093e",
				image:"https://code.s3.yandex.net/react/code/meat-03.png",
				index:1,
				name:"Филе Люминесцентного тетраодонтимформа",
				price:988,
				type:"main"
			}
		]
		const bun = {
			dragId:"e8edda8c-2055-48d0-a34d-adb7c1917695",
			id:"643d69a5c3f7b9001cfa093c",
			image:"https://code.s3.yandex.net/react/code/bun-02.png",
			name:"Краторная булка N-200i",
			price:1255,
			type:"bun"
		}

		setTimeout(() => {
			cy.window()
				.its('store')
				.invoke('dispatch', updateData({products: products, bun: bun}))
		}, 300)
	})
})