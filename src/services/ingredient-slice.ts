import {createSlice} from "@reduxjs/toolkit";
import {TIngredient} from "../types/ingredient";

interface IIngredientSlice {
	ingredient: TIngredient | null
}

export const initialState:IIngredientSlice = {
	ingredient: null
}

export const ingredientSlice = createSlice({
	name: 'ingredient',
	initialState: initialState,
	reducers: {
		getCurrentIngredient(state, action) {
			return {
				ingredient: action.payload.ingredient
			}
		},
		clearCurrentIngredient() {
			return {
				ingredient: null,
			}
		}
	}
})

export const { getCurrentIngredient, clearCurrentIngredient } = ingredientSlice.actions