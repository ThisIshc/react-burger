import {clearCurrentFeed} from "../../../src/services/feed-slice";

describe('test feed slice reducers', () => {
	before(function () {
		cy.visit('http://localhost:3000/')
		cy.visit('http://localhost:3000/feed')
	})

	it('test reducers', () => {
		setTimeout(() => {
			cy.get('[class^=feed_feed__cards] > a').first().click()
			cy.window()
				.its('store')
				.invoke('getState')
				.its('feed')

			cy.window()
				.its('store')
				.invoke('dispatch', clearCurrentFeed())
			cy.window()
				.its('store')
				.invoke('getState')
				.its('feed')
				.should('deep.equal', {feed: null})
		}, 300)

	})
})