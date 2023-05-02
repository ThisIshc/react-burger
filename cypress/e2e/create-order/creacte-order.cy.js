import {TEST_URL} from "../../../src/utils/response";

describe('test ingredient modal', () => {
	before(function () {
		cy.visit(`${TEST_URL}login`)
	})
	it('auth user', () => {
		cy.get('input[name="email"]').type('andreyy.bayandin@yandex.ru')
		cy.get('input[name="password"]').type('qwerty12345')
		cy.get('button[type="submit"]').click()
		cy.get('#ingredient_0').trigger('dragstart')
		cy.get('[class^=burger-constructor_burgerConstructor__list]').trigger('drop')
		cy.get('button[type="button"]').click()
		cy.wait(15000)
		cy.get('[class^=order-details_orderDetails__number] > span')
		cy.get('[class^=modal_modal__content]').find('[class^=modal_modal__close]').click()
	})
})