import {feed} from "../utils/data";
import {feedSlice, getCurrentFeed, clearCurrentFeed, initialState} from "../../services/feed-slice";

describe('feed reducers', () => {
	it('test get current feed', () => {
		const action = {type: getCurrentFeed.type, payload: feed}
		const result = feedSlice.reducer(initialState, action)
		expect(result).toEqual({feed: feed})
	})

	it('test clear current feed', () => {
		const actionIngredient = {type: getCurrentFeed.type, payload: feed}
		const resultIngredient = feedSlice.reducer(initialState, actionIngredient)

		const action = {type: clearCurrentFeed.type}
		const result = feedSlice.reducer(resultIngredient, action)

		expect(result).toEqual({feed: null})
	})
})