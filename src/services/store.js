import {configureStore, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import getIngredientsApi from "../utils/burger-api";
import logger from 'redux-logger'
import createOrder from "../utils/order-api";

export const fetchIngredients = createAsyncThunk(
	'burger/fetchIngredients',
	 async function() {
		const data = await getIngredientsApi()
		return data
	}
)

export const fetchCreateOrder = createAsyncThunk(
	'order/fetchCreateOrder',
	async function(ingredients) {
		const order = await createOrder(ingredients)
		return order
	}
)

/* slice */
const burgerSlice = createSlice({
	name: 'burger',
	initialState: {
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
	},
	reducers: {
		updateTabs(state, action) {
			state.tabs.map((item,index) => {
				return item.active = index === parseInt(action.payload.index)
			})
		}
	},
	extraReducers: {
		[fetchIngredients.pending]: (state) => {
			state.isLoading = true
			state.hasError = false
		},
		[fetchIngredients.fulfilled]: (state, action) => {
			state.isLoading = false
			state.hasError = false
			state.data = action.payload.data
		},
		[fetchIngredients.rejected]: (state, action) => {
			state.isLoading = false
			state.hasError = true
		}
	}
})

const ingredientSlice = createSlice({
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

const burgerConstructorSlice = createSlice({
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
				state.buns.push(action.payload)
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
				order: {}
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
		}
	}
})
/* /slice */

/* actions */
export const { updateTabs } = burgerSlice.actions
export const { getCurrentIngredient, clearCurrentIngredient } = ingredientSlice.actions
export const { addIngredient, updateList, clearOrder, deleteIngredientConstructor } = burgerConstructorSlice.actions
/* /actions */




const store = configureStore({
	reducer: {
		burger: burgerSlice.reducer,
		ingredient: ingredientSlice.reducer,
		order: burgerConstructorSlice.reducer
	},
	middleware: (getDefaultMiddleaware) => getDefaultMiddleaware().concat(logger),
	devTools: process.env.NODE_ENV !== 'production'
})

export default store;