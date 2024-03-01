describe('My first test suite', function() {
    it('My first test case', function() {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')

        // Chai assertion to verify number of products filtered
        cy.get('.product h4').should('have.length',4)
        // Using 'visible' to filter the hidden element
        cy.get('.product:visible').should('have.length',4)
        //Parent-child chaining
        cy.get('.products').find('.product').should('have.length',4)

        //Click 'Carrot' add to cart button
        cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click()

        //Click add to cart for 'Cashews' by going through each item
        cy.get('.products').find('.product').each(($el, index, $list) => {
            const itemName= $el.find('h4.product-name').text()
            if(itemName.includes('Cashews')) {
                cy.wrap($el).find('button').click()
            }
        })
        //Brand text
        //cy.get('.brand').text() // it will not work, text() is a jquery method. We need to resolve the promise first
        cy.get('.brand').then(function(brandElement) {
            cy.log(brandElement.text())
        })

        //Chai Assertion to verify brand name
        cy.get('.brand').should('have.text','GREENKART')

         //Click on cart icon
        cy.get('.cart-icon').click()

        //Click on 'Proceed to checkout' button
        cy.get('.action-block button').contains('PROCEED TO CHECKOUT').click()

        //Click on 'Place Order' button
        cy.get('button').contains('Place Order').click()

        //Select country in static dropdown
        cy.get('select').select('Argentina').should('have.value','Argentina')

        //Check agree and continue checkbox
        cy.get('input[type="checkbox"]').check().should('be.checked')

        //Click Proceed button
        cy.get('button').contains('Proceed').click()


    })
})