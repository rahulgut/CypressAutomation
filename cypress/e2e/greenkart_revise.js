describe('Greenkart revise test suite', function() {
    it('Greenkart revise test', function() {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')

        //Validate 'Greenkart' brand logo
        cy.get('.brand').then(function(ele) {
            expect(ele.text()).to.eql('GREENKART')
        })

        //Add item 'Tomato' to cart by hardcoding index
        cy.get('.products .product').eq(5).find('button').click()

        //Add an item 'Cauliflower' to cart
        cy.get('.products ').find('.product').each(($el, index, $list) => {
            if($el.find('h4.product-name').text().includes('Cauliflower')) {
                cy.wrap($el).find('button').click()
            }
        })

        //Click on cart icon
        cy.get('a.cart-icon').click()

        //Click 'Proceed to Checkout'
        cy.get('.action-block button').contains('PROCEED TO CHECKOUT').click()

        //Validate sum of items
        var sum=0
        cy.get('td:nth-child(5) p').each(($i, index, $list) => {
            sum=sum+ parseInt($i.text())
            cy.log(sum)
        })

        cy.get('.discountAmt').then(function(elementVal) {
            cy.log(elementVal.text())
            cy.log(sum)
            expect(sum).to.eql(parseInt(elementVal.text()))
        })

        //Click 'Place Order'
        cy.get('button').contains('Place Order').click()

        //Choose country from static dropdown and validate
        cy.get('select').select('Australia').should('have.value','Australia')

        //Check terms and Conditions checkbox and validate
        cy.get('.chkAgree').check().should('be.checked')

        //Click 'Proceed' button
        cy.get('button').contains('Proceed').click()
    })
})