import {updateTabs} from "../../../src/services/burger-slice";

describe('test burger slice reducers', () => {
	before(function () {
		cy.visit('http://localhost:3000/')
	})
	it('test updateTabs', () => {
		const tabs = [
			{
				value: "Булки",
				active: false
			},
			{
				value: "Начинки",
				active: false
			},
			{
				value: "Соусы",
				active: true
			}
		]
		setTimeout(() => {
			cy.window()
				.its('store')
				.invoke('dispatch', updateTabs({index:2}))
			cy.window()
				.its('store')
				.invoke('getState')
				.its('burger')
				.its('tabs')
				.should('deep.equal', tabs)
		}, 300)
	})
})