import {initialState} from "../../services/user-slice";

describe('user state', () => {
	it('test initialState', () => {
		const selectIngredient = state => state.user
		expect(selectIngredient({user: {
				resetData: null,
				resetPassword: null,
				userData: null,
				errorMessage: ''
			}})).toEqual(initialState)
	})
})