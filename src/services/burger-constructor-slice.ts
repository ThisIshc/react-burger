import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import createOrder from "../utils/order-api";
import {TIngredientShort} from "../types/ingredient";

interface IBurgerConstructor {
	ingredients: TIngredientShort[],
	buns: TIngredientShort[],
	order: any,
	modalIsOpen: boolean,
	hasError: boolean
}

export const fetchCreateOrder = createAsyncThunk(
	'order/fetchCreateOrder',
	async function(ingredients:string[]) {
		const order = await createOrder(ingredients)
		return order
	}
)

export const initialState:IBurgerConstructor = {
	ingredients: [],
	buns: [],
	order: {},
	modalIsOpen: false,
	hasError: false
}

export const burgerConstructorSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		addIngredient(state, action: PayloadAction<TIngredientShort>) {
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
		clearOrder(state) {
			return {
				...state,
				order: {},
				hasError: false,
				ingredients: [],
				buns: []
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCreateOrder.pending, (state) => {
			state.hasError = false
		})
		builder.addCase(fetchCreateOrder.fulfilled, (state, action) => {
			state.hasError = false
			state.order = action.payload.order
		})
		builder.addCase(fetchCreateOrder.rejected, (state) => {
			state.hasError = true
			state.order = {}
		})
	}
})


export const { addIngredient, updateList, clearOrder, deleteIngredientConstructor } = burgerConstructorSlice.actions