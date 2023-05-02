import {getUser, passwordReset, resetPassword, updateUser, userAuth, userRegistration} from "../../utils/user-api";

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

	it('test fetch password reset', async () => {
		const result = await passwordReset('email')

		expect(result).toEqual({result: 'OK'})
		expect(fetch).toHaveBeenCalledTimes(1)
	})
	it('test fetch reset password', async () => {
		const result = await resetPassword({password: 'password', token: 'token'})

		expect(result).toEqual({result: 'OK'})
		expect(fetch).toHaveBeenCalledTimes(1)
	})
	it('test fetch user registration', async () => {
		const result = await userRegistration({email: 'email', password: 'password', name: 'name'})

		expect(result).toEqual({result: 'OK'})
		expect(fetch).toHaveBeenCalledTimes(1)
	})
	it('test fetch user auth', async () => {
		const result = await userAuth({email: 'email', password: 'password'})

		expect(result).toEqual({result: 'OK'})
		expect(fetch).toHaveBeenCalledTimes(1)
	})
	it('test fetch get user', async () => {
		const result = await getUser()

		expect(result).toEqual({result: 'OK'})
		expect(fetch).toHaveBeenCalledTimes(1)
	})
	it('test fetch update user', async () => {
		const result = await updateUser({email: 'email', password: 'password', name: 'name'})

		expect(result).toEqual({result: 'OK'})
		expect(fetch).toHaveBeenCalledTimes(1)
	})
})