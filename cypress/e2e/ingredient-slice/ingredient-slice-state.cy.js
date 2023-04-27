import {initialState} from "../../../src/services/ingredient-slice";

describe('test ingredient slice initialState', () => {
	before(function () {
		cy.visit('http://localhost:3000/')
	})
	it('test initialState', () => {
		cy.window()
			.its('store')
			.invoke('getState')
			.its('ingredient')
			.should('deep.equal', initialState)
	})
})