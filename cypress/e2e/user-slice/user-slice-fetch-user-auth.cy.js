import {fetchUserAuth, initialState} from "../../../src/services/user-slice";

describe('test user slice auth', () => {
	before(function () {
		cy.visit('http://localhost:3000/')
	})
	it('test user auth', () => {
		cy.window()
			.its('store')
			.invoke('dispatch', fetchUserAuth({email: 'andreyy.bayandin@yandex.ru', password: 'qwerty12345'}))
			.then((res) => res.payload)
			.its('payload')
			.its('success')
			.should('equal', true)
	})
})