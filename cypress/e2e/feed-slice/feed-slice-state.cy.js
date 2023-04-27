import {initialState} from "../../../src/services/feed-slice";

describe('test feed slice initialState', () => {
	before(function () {
		cy.visit('http://localhost:3000/')
	})
	it('test initialState', () => {
		cy.window()
			.its('store')
			.invoke('getState')
			.its('feed')
			.should('deep.equal', initialState)
	})
})