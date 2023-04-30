import getIngredientsApi from "../../utils/burger-api";



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
		const result = await getIngredientsApi()

		expect(result).toEqual({result: 'OK'})
		expect(fetch).toHaveBeenCalledTimes(1)
	})
})