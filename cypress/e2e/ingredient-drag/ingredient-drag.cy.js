describe('test ingredient modal', () => {
	before(function () {
		cy.visit('http://localhost:3000/')
	})
	it('move ingredient', () => {
		cy.get('#ingredient_0').trigger('dragstart')
		cy.get('[class^=burger-constructor_burgerConstructor__list]').trigger('drop')
	})
})