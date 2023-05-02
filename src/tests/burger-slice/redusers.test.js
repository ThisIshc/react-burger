import {burgerSlice, initialState, updateTabs, updateData} from "../../services/burger-slice";
import {bun, product_2} from "../utils/data";

describe('burger constructor reducers', () => {
	it('test update tabs', () => {
		const action = {type: updateTabs.type, payload: {index: '2'}}
		const result = burgerSlice.reducer(initialState, action)

		expect(result.tabs[2].active).toEqual(true)
	})
	it('test update data', () => {
		const state = {
			...initialState,
			data: [bun, product_2]
		}
		const action = {type: updateData.type, payload: {products: [product_2], bun: bun}}
		const result = burgerSlice.reducer(state, action)
		expect(result.data[0].count).toEqual(2)
		expect(result.data[1].count).toEqual(1)
	})
})

