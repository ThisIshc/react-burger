import createOrder from "../../utils/order-api";

describe('async actions', () => {
	beforeEach(() => {
		jest.spyOn(global, 'fetch').mockResolvedValue({
			json: jest.fn().mockResolvedValue({result: 'OK'}),
			ok: true
		})
	})

	afterEach(() => {
		jest.restoreAllMocks()
	})

	it('test fetch case', async () => {
		const orderData =  [
			"643d69a5c3f7b9001cfa093e",
			"643d69a5c3f7b9001cfa0941",
			"643d69a5c3f7b9001cfa093d",
			"643d69a5c3f7b9001cfa093d"
		]
		const result = await createOrder(orderData)

		expect(result).toEqual({result: 'OK'})
		expect(fetch).toHaveBeenCalledTimes(1)
	})
})