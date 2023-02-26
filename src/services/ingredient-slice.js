import {createSlice} from "@reduxjs/toolkit";

export const ingredientSlice = createSlice({
	name: 'ingredient',
	initialState: {
		ingredient: null,
	},
	reducers: {
		getCurrentIngredient(state, action) {
			return {
				ingredient: action.payload.ingredient
			}
		},
		clearCurrentIngredient(state, action) {
			return {
				ingredient: null,
			}
		}
	}
})

export const { getCurrentIngredient, clearCurrentIngredient } = ingredientSlice.actions