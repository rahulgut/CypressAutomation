describe('Amazon Gorcery website test suite', function() {
    it('Amazon website smoke test', function() {

        cy.visit('https://www.amazon.in/')

        //Searching iphone
        //cy.get('input[id="twotabsearchtextbox"]').type('iphone')
        //cy.get('input[id="nav-search-submit-button"]').click()
        //cy.get('div h2 a').contains('Apple iPhone 14 (128 GB) - Starlight').click()

        //Selecting a mobile and clicking add to cart
        cy.get('div[id="nav-xshop"] a').contains('Mobiles').click()

        cy.get('div[class="sl-sobe-carousel-sub-card-image"]').eq(2).click()
        
        cy.get('input[id="add-to-cart-button"]').click()
        cy.wait(4000)
        //cy.get('input[name="proceedToRetailCheckout"]').click()
        cy.get('span span[id="attach-accessory-proceed-to-checkout-text"]').contains('Proceed to checkout (1 item)').click({force: true})

        cy.get('input[id="ap_email"]').type('rahul89dhawan@gmail.com')
        cy.get('input[id="continue"]').click()
    })
})