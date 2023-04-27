import {fetchPasswordReset} from "../../../src/services/user-slice";

describe('test user slice password reset', () => {
	before(function () {
		cy.visit('http://localhost:3000/')
	})
	it('test fetch user password reset', () => {
		cy.window()
			.its('store')
			.invoke('dispatch', fetchPasswordReset('andreyy.bayandin@yandex.ru'))
			.then((res) => res.payload)
			.its('payload')
			.its('success')
			.should('equal', true)
	})
})