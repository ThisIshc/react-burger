import {initialState} from '../../services/feed-slice';
describe('ingredient state', () => {
	it('test initialState', () => {
		const selectIngredient = state => state.feed
		expect(selectIngredient({feed: {feed: null}})).toEqual(initialState)
	})
})