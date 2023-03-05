import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import createOrder from "../utils/order-api";

export const fetchCreateOrder = createAsyncThunk(
	'order/fetchCreateOrder',
	async function(ingredients) {
		const order = await createOrder(ingredients)
		return order
	}
)

export const burgerConstructorSlice = createSlice({
	name: 'order',
	initialState: {
		ingredients: [],
		buns: [],
		order: {},
		modalIsOpen: false,
		hasError: false
	},
	reducers: {
		addIngredient(state, action) {
			if (action.payload.type === 'bun') {
				if (state.buns.length) {
					state.buns = [];
					state.buns.push(action.payload)
				} else {
					state.buns.push(action.payload)
				}
			} else {
				const item = {
					...action.payload,
					index: state.ingredients.length + 1
				}
				state.ingredients.push(item)
			}
		},
		updateList(state, action) {
			return {
				...state,
				ingredients: action.payload.items
			}
		},
		deleteIngredientConstructor(state, action) {
			state.ingredients.forEach((item, index) => {
				if (item.dragId === action.payload.itemId) {
					state.ingredients.splice(index, 1)
				}
			})
		},
		clearOrder(state, action) {
			return {
				...state,
				order: {},
				hasError: false
			}
		}
	},
	extraReducers: {
		[fetchCreateOrder.pending]: (state) => {
			state.hasError = false
		},
		[fetchCreateOrder.fulfilled]: (state, action) => {
			state.hasError = false
			state.order = action.payload.order
		},
		[fetchCreateOrder.rejected]: (state, action) => {
			state.hasError = true
			state.order = {}
		}
	}
})


export const { addIngredient, updateList, clearOrder, deleteIngredientConstructor } = burgerConstructorSlice.actions