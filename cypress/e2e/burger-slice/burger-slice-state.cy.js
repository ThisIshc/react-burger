import {initialState} from "../../../src/services/burger-slice";

describe('test burger slice initialState', () => {
	before(function () {
		cy.visit('http://localhost:3000/')
	})
	it('test initialState', () => {
		cy.window()
			.its('store')
			.invoke('getState')
			.its('burger')
			.should('deep.equal', initialState)
	})
})