import {TEST_URL} from "../../../src/utils/response";

describe('test ingredient modal', () => {
	before(function () {
		cy.visit(TEST_URL)
	})
	it('move ingredient', () => {
		cy.get('#ingredient_0').trigger('dragstart')
		cy.get('[class^=burger-constructor_burgerConstructor__list]').trigger('drop')
	})
})