import {ingredientData} from "../utils/data";
import {
	ingredientSlice,
	getCurrentIngredient,
	clearCurrentIngredient,
	initialState
} from "../../services/ingredient-slice";
describe('ingredient reducers', () => {
	it('test getCurrentIngredient', () => {
		const action = {type: getCurrentIngredient.type, payload: ingredientData}
		const result = ingredientSlice.reducer(initialState, action)
		expect(result).toEqual(ingredientData)
	})

	it('test clearCurrentIngredient', () => {
		const actionIngredient = {type: getCurrentIngredient.type, payload: ingredientData}
		const resultIngredient = ingredientSlice.reducer(initialState, actionIngredient)

		const action = {type: clearCurrentIngredient.type}
		const result = ingredientSlice.reducer(resultIngredient, action)

		expect(result).toEqual({ingredient: null})
	})
})