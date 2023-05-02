import {initialState} from '../../services/ingredient-slice';
describe('ingredient state', () => {
	it('test initialState', () => {
		const selectIngredient = state => state.ingredient
		expect(selectIngredient({ingredient: {ingredient: null}})).toEqual(initialState)
	})
})