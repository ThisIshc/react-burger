import {addIngredient} from "../../../src/services/burger-constructor-slice";
import {v4 as uuidv4} from "uuid";

describe('test burger constructor slice add ingredient', () => {
	before(function () {
		cy.visit('http://localhost:3000/')
	})
	it('test add ingredient', () => {
		const product_1 = {
			id:"643d69a5c3f7b9001cfa093c",
			image:"https://code.s3.yandex.net/react/code/bun-02.png",
			name:"Краторная булка N-200i",
			price:1255,
			type:"bun",
			dragId: uuidv4()
			}
		const product_2 = {
			id:"643d69a5c3f7b9001cfa093e",
			image:"https://code.s3.yandex.net/react/code/meat-03.png",
			name:"Филе Люминесцентного тетраодонтимформа",
			price:988,
			type:"main",
			dragId: uuidv4()
		}

		setTimeout(()=> {
			cy.window()
				.its('store')
				.invoke('dispatch', addIngredient(product_1))
			cy.window()
				.its('store')
				.invoke('dispatch', addIngredient(product_2))
		}, 300)
	})
})