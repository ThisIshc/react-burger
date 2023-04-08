import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import getIngredientsApi from "../utils/burger-api";
import {TBurgerTab} from "../types/burger";
import {TIngredient} from "../types/ingredient";

interface IBurger {
	data: TIngredient[],
	tabs: TBurgerTab[]
	isLoading: boolean,
	hasError: boolean,
}

export const fetchIngredients = createAsyncThunk(
	'burger/fetchIngredients',
	async function() {
		const data = await getIngredientsApi()
		return data
	}
)

const initialState:IBurger = {
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
}

export const burgerSlice = createSlice({
	name: 'burger',
	initialState: initialState,
	reducers: {
		updateTabs(state, action) {
			state.tabs.map((item,index) => {
				return item.active = index === parseInt(action.payload.index)
			})
		},
		updateData(state, action) {
			state.data.forEach((item) => {
				item.count = 0
				action.payload.products.forEach((product:TIngredient) => {
					if (item._id === product.id) {
						item.count = item.count !== undefined ? item.count + 1 : 0
					}
				})
				if (item._id === action.payload.bun.id) {
					item.count = item.count + 2
				}
			})
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchIngredients.pending, (state) => {
			state.isLoading = true
			state.hasError = false
		})
		builder.addCase(fetchIngredients.fulfilled, (state, action) => {
			state.isLoading = false
			state.hasError = false
			state.data = action.payload.data
		})
		builder.addCase(fetchIngredients.rejected, (state) => {
			state.isLoading = false
			state.hasError = true
			state.data = []
		})
	}
})


export const { updateTabs, updateData } = burgerSlice.actions