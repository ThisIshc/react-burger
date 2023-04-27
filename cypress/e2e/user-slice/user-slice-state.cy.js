import {initialState} from "../../../src/services/user-slice";

describe('test user slice initialState', () => {
	before(function () {
		cy.visit('http://localhost:3000/')
	})
	it('test initialState', () => {
		cy.window()
			.its('store')
			.invoke('getState')
			.its('user')
			.should('deep.equal', initialState)
	})
})