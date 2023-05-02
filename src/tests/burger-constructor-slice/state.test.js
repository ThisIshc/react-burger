import {initialState} from '../../services/burger-constructor-slice';
describe('ingredient state', () => {
	it('test initialState', () => {
		const selectBurgerConstructor = state => state.order
		const defaultData = {
			order: {
				ingredients: [],
				buns: [],
				order: {},
				modalIsOpen: false,
				hasError: false
			}
		}

		expect(selectBurgerConstructor(defaultData)).toEqual(initialState)
	})
})