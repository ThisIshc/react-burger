import {TEST_URL} from "../../../src/utils/response";

describe('test ingredient modal', () => {
	before(function () {
		cy.visit(TEST_URL)
	})
	it('click ingredient', () => {
		setTimeout(() => {
			cy.get('[class^=ingredients-group_ingredientsGroup__item]').first().click()
		}, 200)
		setTimeout(() => {
			cy.get('#modalIngredientContent').as('modalContent')
			cy.get('@modalContent').find('img')
			cy.get('@modalContent').find('[class^=ingredient-details_detailIngredient__title]')
			cy.get('@modalContent').find('[class^=ingredient-details_detailIngredient__prop]')
			cy.get('[class^=modal_modal__content]').find('[class^=modal_modal__close]').click()
		}, 300)

	})
})