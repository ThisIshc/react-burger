import {fetchIngredients} from "../../../src/services/burger-slice";

describe('test burger slice fetch ingredients', () => {
	before(function () {
		cy.visit('http://localhost:3000/')
	})
	it('test fetchIngredients', () => {
		setTimeout(() => {
			cy.window()
				.its('store')
				.invoke('dispatch', fetchIngredients())
				.then((res) => {
					return res.payload })
				.its('payload')
				.its('success')
				.should('equal', true)
		}, 300)
	})
})