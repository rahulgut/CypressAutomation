import homePage from "../pageObjects/homePage"
import productsPage from "../pageObjects/productsPage"
import cartPage from "../pageObjects/cartPage"
import buyPage from "../pageObjects/buyPage"

describe('Ecommerce test suite', function() {

    before(function() {
        cy.fixture('example').then((data) => {
            this.data=data
        })
    })
    it('Ecommerce test', function() {

        //Crate object of homePage class
        const hp= new homePage()

        //Create object of productsPage class
        const pp= new productsPage()

        //Create object of cartPage class
        const cp= new cartPage()

        //Create object of buyPage class
        const bp= new buyPage()

        //Open website
        //cy.visit('https://rahulshettyacademy.com/angularpractice/')
        cy.visit(Cypress.env('url')+'/angularpractice/')

        //************* Home page *****************

        //Hardcoding values as inputs
        //cy.get('.form-group input[name="name"]').type('Rahul D')
        //cy.get('#exampleFormControlSelect1').select('Female')

        //Fetching data from fixture file
        //cy.get('.form-group input[name="name"]').type(this.data.name)
        hp.getInputBoxName().type(this.data.name)

        //cy.get('#exampleFormControlSelect1').select(this.data.gender)
        hp.getSelectGender().select(this.data.gender)

        //Verifying name in two-way data binding field
        //cy.get('h4 input').should('have.value',this.data.name)
        hp.getInputBoxVerifyName().should('have.value',this.data.name)

        //Verify minlength attribute for input field
        //cy.get('.form-group input[name="name"]').should('have.attr','minlength','2')
        hp.getInputBoxName().should('have.attr','minlength','2')

        //Verify entrepreneur radio button is disables
        //cy.get('#inlineRadio3').should('be.disabled')
        hp.getRadioButtonEntrepreneur().should('be.disabled')

        //Click on Shop tab
        //cy.contains('Shop').click()
        hp.getTabShop().click()

        //****************** Products page ******************

        //Add item to cart
        //Adding items by hardcoding
        //cy.selectProduct('Nokia Edge')
        //cy.selectProduct('Blackberry')

       //Adding products by iterating through array from example.json
       this.data.productName.forEach((element) => {
        cy.selectProduct(element)
       });

       //cy.wait(2000)

        //Click checkout cart button
        //cy.contains('Checkout').click()
        pp.getButtonCheckoutCart().click()

        //****************** Cart page ******************

        //Validate total cart price
        var sum=0
        let total=0
        //cy.get('td:nth-child(4) strong').each(($i, index, $list) => {
        cp.getProductPrice().each(($i, index, $list) => {
            const val= $i.text()
            cy.log(val)
            const amountStr= val.split(' ')[1]
            cy.log(amountStr)
            sum=sum+parseInt(amountStr)
            cy.log(sum)
        })
        //cy.get('h3 strong').then((totalVal) => {
        cp.getTotalPrice().then((totalVal) => {
            cy.log(totalVal.text())
            total= parseInt(totalVal.text().split(' ')[1])
            cy.log(total)
            expect(sum).to.be.eql(total)
        })

        //Click checkout button
        //cy.get('.btn-success').click()
        cp.getButtonCheckout().click()

        //****************** Buy page ******************

        //Type 'ind' and select India in dynamic dropdown
        //cy.get('#country').type('ind')
        bp.getInputBoxCountry().type('ind')

        //cy.wait(2000)
        //default command timeout update
        Cypress.config('defaultCommandTimeout',6000)

        //cy.get('.suggestions a').each(($element, index, $list) => {
        bp.getCountryList().each(($element, index, $list) => {
            cy.log($element.text())
            if($element.text() == 'India') {
                cy.wrap($element).click()
            }
        })

        //Checkox 'I agree'
        //cy.get('#checkbox2').check({force: true})
        bp.getCheckboxAgree().check({force: true})

        //Click 'Purchase' button
        //cy.get('.btn-success').click()
        bp.getButtonPurchase().click()

        //Validate success message
        //cy.get('.alert-success').should('contain.text','Success')
        bp.getTextSuccessAlert().should('contain.text','Success')
    })
})