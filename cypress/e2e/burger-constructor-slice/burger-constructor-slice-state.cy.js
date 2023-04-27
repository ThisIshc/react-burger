import {initialState} from "../../../src/services/burger-constructor-slice";

describe('test burger constructor slice initialState', () => {
	before(function () {
		cy.visit('http://localhost:3000/')
	})
	it('test initialState', () => {
		cy.window()
			.its('store')
			.invoke('getState')
			.its('order')
			.should('deep.equal', initialState)
	})
})