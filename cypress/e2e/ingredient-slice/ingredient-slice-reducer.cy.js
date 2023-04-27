import {clearCurrentIngredient, getCurrentIngredient} from "../../../src/services/ingredient-slice";

describe('test ingredient slice reducers', () => {
	before(function () {
		cy.visit('http://localhost:3000/')
	})

	it('test reducers', () => {
		const ingredientData = {
			ingredient: {
				calories: 4242,
				carbohydrates: 242,
				fat: 142,
				image: "https://code.s3.yandex.net/react/code/meat-01.png",
				image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
				image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
				name: "Биокотлета из марсианской Магнолии",
				price: 424,
				proteins: 420,
				type: "main",
				__v: 0,
				_id: "643d69a5c3f7b9001cfa0941"
			}
		}
		cy.window()
			.its('store')
			.invoke('dispatch', getCurrentIngredient(ingredientData))
		cy.window()
			.its('store')
			.invoke('getState')
			.its('ingredient')
			.should('deep.equal', ingredientData)


		cy.window()
			.its('store')
			.invoke('dispatch', clearCurrentIngredient())
		cy.window()
			.its('store')
			.invoke('getState')
			.its('ingredient')
			.should('deep.equal', {ingredient: null})
	})
})