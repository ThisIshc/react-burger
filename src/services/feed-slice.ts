import {createSlice} from "@reduxjs/toolkit";

// interface IIngredientSlice {
// 	ingredient: TIngredient | null
// }

const initialState:any = {
	feed: null
}

export const feedSlice = createSlice({
	name: 'feed',
	initialState: initialState,
	reducers: {
		getCurrentFeed(state, action) {
			return {
				feed: action.payload
			}
		},
		clearCurrentFeed() {
			return {
				feed: null,
			}
		}
	}
})

export const { getCurrentFeed, clearCurrentFeed } = feedSlice.actions