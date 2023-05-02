import {initialState} from '../../services/burger-slice';
describe('burger state', () => {
	it('test initialState', () => {
		const selectIngredient = state => state.burger
		expect(selectIngredient({burger: {
			data: [],
			isLoading: false,
			hasError: false,
			tabs: [
				{
					value: "Булки",
					active: true
				},
				{
					value: "Начинки",
					active: false
				},
				{
					value: "Соусы",
					active: false
				}
			]
		}})).toEqual(initialState)
	})
})