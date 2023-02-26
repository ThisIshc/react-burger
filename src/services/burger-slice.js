import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import getIngredientsApi from "../utils/burger-api";

export const fetchIngredients = createAsyncThunk(
	'burger/fetchIngredients',
	async function() {
		const data = await getIngredientsApi()
		return data
	}
)

export const burgerSlice = createSlice({
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
		},
		updateData(state, action) {
			state.data.forEach((item) => {
				item.count = 0
				action.payload.products.forEach((product) => {
					if (item._id === product.id) {
						item.count = item.count + 1
					}
				})
				if (item._id === action.payload.bun.id) {
					item.count = item.count + 2
				}
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
			state.data = []
		}
	}
})


export const { updateTabs, updateData } = burgerSlice.actions