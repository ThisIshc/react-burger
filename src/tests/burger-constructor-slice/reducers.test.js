import {burgerConstructorSlice, initialState,
	addIngredient,
	updateList,
	deleteIngredientConstructor,
	clearOrder} from "../../services/burger-constructor-slice";
import {bun, order, product_1, product_2, product_3} from "../utils/data";

describe('burger constructor reducers', () => {
	it('test add ingredient', () => {
		const action = {type: addIngredient.type, payload: product_1}
		const result = burgerConstructorSlice.reducer(initialState, action)

		expect(result.buns).toEqual([product_1])
	})

	it('test update list', () => {
		const ingredient_1 = {...product_2, index: 1}
		const ingredient_2 = {...product_3, index: 2}
		const ingredients = {
			items: [
				ingredient_1, ingredient_2
			]
		}
		const state = {
			...initialState,
			ingredients: [
				ingredient_1, ingredient_2
			],
		}

		const action = {type: updateList.type, payload: {items: [ingredient_2, ingredient_1]}}
		const result = burgerConstructorSlice.reducer(state, action)

		expect(result.ingredients).toEqual(ingredients.items.reverse())
	})

	it('test delete ingredient constructor', () => {
		const ingredient = product_2
		const state = {
			...initialState,
			ingredients: [ingredient]
		}
		const action = {type: deleteIngredientConstructor.type, payload: {itemId: ingredient.dragId}}
		const result = burgerConstructorSlice.reducer(state, action)
		expect(result.ingredients).toEqual([])
	})

	it('test clear order', () => {
		const state = {
			...initialState,
			order: order
		}
		const action = {type: clearOrder.type, payload: {order: order}}
		const result = burgerConstructorSlice.reducer(state, action)
		expect(result).toEqual(initialState)
	})


})

