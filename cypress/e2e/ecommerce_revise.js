import homePage from "../pageObjects/homePage"
import productsPage from "../pageObjects/productsPage"
import cartPage from "../pageObjects/cartPage"
import buyPage from "../pageObjects/buyPage"

describe('Ecommerce test suite', function() {

    before(function() {
        cy.fixture('example').then((data) => {
            this.data= data
        })
    })

    it('Ecommerce test', function() {

        //Create object of homePage class
        const hp= new homePage()

        //Create object of productsPage class
        const pp= new productsPage()

        //Create object of cartPage class
        const cp= new cartPage()

        //Create object of buyPage class
        const bp= new buyPage()

        //Open URL
        cy.visit('https://rahulshettyacademy.com/angularpractice/')

         //***************** Home Page *********************
        //Enter name in input field
        //cy.get('.form-group input[name="name"]').type('Neha Thukral')

        //Enter name in input field from fixture file
        //cy.get('.form-group input[name="name"]').type(this.data.name)
        hp.getInputBoxName().type(this.data.name)

        //Enter email in input field
        cy.get('input[name="email"]').type("nehathukral@gmail.com")

        //Enter passowrd in input field
        cy.get('#exampleInputPassword1').type('hello123')

        //Checkbox the checkbox and validate
        cy.get('input[id="exampleCheck1"]').check().should('be.checked')

        //Select Female dropdown and validate
        //cy.get('select').select('Female').should('have.value','Female')

        //Select Female dropdown from fixture file and validate
        //cy.get('select').select(this.data.gender).should('have.value',this.data.gender)
        hp.getSelectGender().select(this.data.gender).should('have.value',this.data.gender)

        //Check Student radio button
        cy.get('#inlineRadio1').should('not.be.checked')
        cy.get('#inlineRadio1').check().should('be.checked')

        //Check if Entrepreneur radio button is disabled
        //cy.get('#inlineRadio3').should('be.disabled')
        hp.getRadioButtonEntrepreneur().should('be.disabled')

        //Enter date of birth
        cy.get('input[name="bday"]').type('1992-09-09')

        //Validate 2 way data binding input field value
        //cy.get('h4 input[name="name"]').should('have.value',this.data.name)
        hp.getInputBoxVerifyName().should('have.value',this.data.name)

        //Click on Submit button
        cy.get('.btn-success').click()

        //Validate success alert text
        cy.get('.alert-success').should('include.text','Success')

        //Click on Shop tab
        //cy.get('li.nav-item a').contains('Shop').click()
        hp.getTabShop().click()

        //***************** Products Page *********************
        //Add Samsung Note 8 product to cart
        cy.get('div[class="card h-100"]').each(($el, index, $list) => {
            if($el.find('h4.card-title a').text() == 'Samsung Note 8') {
                cy.wrap($el).find('button').click()
            }
        })

        //Adding products to cart for each productName from fixture file
        this.data.productName.forEach(element => {
            cy.get('div[class="card h-100"]').each(($el, index, $list) => {
                if($el.find('h4.card-title a').text() == element) {
                    cy.wrap($el).find('button').click()
                }
            })
        })

        //Adding products to cart for each productName from fixture file using reusable ethod from commands.js
        this.data.productName.forEach(element => {
            cy.selectProduct(element)
        })

        //Click on 'Checkout'
        //cy.get('li a').contains('Checkout').click()
        pp.getButtonCheckoutCart().click()

        //***************** Cart Page *********************
        //Validate sum of items
        let sum=0
        //cy.get('td:nth-child(4) strong').each(($i, index, $list) => {
        cp.getProductPrice().each(($i, index, $list) => {
            cy.log($i.text())
            cy.log($i.text().split(' ')[1])
            sum=sum+ parseInt($i.text().split(' ')[1])
            cy.log("Sum= "+sum)
        })
        //cy.get('h3 strong').then((textVal) => {
        cp.getTotalPrice().then((textVal) => {
            cy.log(textVal.text().split(' ')[1])
            expect(sum).to.eql(parseInt(textVal.text().split(' ')[1]))
        })

        //Click 'Checkout' button
        //cy.get('button.btn-success').click()
        cp.getButtonCheckout().click()

        //***************** Buy Page *********************
        //Select country from dynamic dropdown
        //cy.get('input[id="country"]').type('in')
        bp.getInputBoxCountry().type('in')
        
        //cy.get('div.suggestions ul li a').each(($ele, index, $list) => {
        bp.getCountryList().each(($ele, index, $list) => {
            if($ele.text() == 'India') {
                cy.wrap($ele).click()
            }
        })

        //Check terms and conditions checkbox and validate
        //cy.get('#checkbox2').check({force: true}).should('be.checked')
        bp.getCheckboxAgree().check({force: true}).should('be.checked')

        //Click on 'Purchase'
        //cy.get('input[value="Purchase"]').click()
        bp.getButtonPurchase().click()

        //Validate Success message
        //cy.get('div.alert-success').should('include.text','Success')
        bp.getTextSuccessAlert().should('include.text','Success')
    })
})