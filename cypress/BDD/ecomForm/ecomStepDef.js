import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import homePage from "../../pageObjects/homePage"
import productsPage from "../../pageObjects/productsPage"
import cartPage from "../../pageObjects/cartPage"
import buyPage from "../../pageObjects/buyPage"

const hp= new homePage()
const pp= new productsPage()
const cp= new cartPage()
const bp= new buyPage()

let customerName
//Given Open ecommerce webpage where form is displayed
Given('Open ecommerce webpage where form is displayed', function() {
    //Open URL
    //cy.visit('https://rahulshettyacademy.com/angularpractice/')
    cy.visit(Cypress.env('url')+'/angularpractice/')
})

//When Fill the form details
When('Fill the form details', function(dataTable) {
    customerName= dataTable.rawTable[1][0]
    hp.getInputBoxName().type(customerName)
    //Select Female dropdown from fixture file and validate
    hp.getSelectGender().select(dataTable.rawTable[1][1]).should('have.value',dataTable.rawTable[1][1])

    //Enter email in input field
    cy.get('input[name="email"]').type("nehathukral@gmail.com")

    //Enter passowrd in input field
    cy.get('#exampleInputPassword1').type('hello123')

    //Checkbox the checkbox and validate
    cy.get('input[id="exampleCheck1"]').check().should('be.checked')

    //Enter date of birth
    cy.get('input[name="bday"]').type('1992-09-09')
})

//Then Validate the form
Then('Validate the form', function() {
    //Check Student radio button
    cy.get('#inlineRadio1').should('not.be.checked')
    cy.get('#inlineRadio1').check().should('be.checked')

    //Check if Entrepreneur radio button is disabled
    hp.getRadioButtonEntrepreneur().should('be.disabled')

    //Validate 2 way data binding input field value
    hp.getInputBoxVerifyName().should('have.value',customerName)

    //Click on Submit button
    cy.get('.btn-success').click()

    //Validate success alert text
    cy.get('.alert-success').should('include.text','Success')
})

//And Proceed to Shop tab
Then('Proceed to Shop tab', function() {
    //Click on Shop tab
    hp.getTabShop().click()
})

//Given Open ecommerce webpage where products are displayed
Given('Open ecommerce webpage where products are displayed', function() {
    cy.visit('https://rahulshettyacademy.com/angularpractice/shop')
})

//When Add items to cart
When('Add items to cart', function() {
    //Adding products to cart for each productName from fixture file using reusable ethod from commands.js
    this.data.productName.forEach(element => {
        cy.selectProduct(element)
    })

    //Click on 'Checkout'
    pp.getButtonCheckoutCart().click()
})

//Then Validate items and proceed to buy page
Then('Validate items and proceed to buy page', function() {
    //Validate sum of items
    let sum=0

    cp.getProductPrice().each(($i, index, $list) => {
        cy.log($i.text())
        cy.log($i.text().split(' ')[1])
        sum=sum+ parseInt($i.text().split(' ')[1])
        cy.log("Sum= "+sum)
    })

    cp.getTotalPrice().then((textVal) => {
        cy.log(textVal.text().split(' ')[1])
        expect(sum).to.eql(parseInt(textVal.text().split(' ')[1]))
    })

    //Click 'Checkout' button
    cp.getButtonCheckout().click()
})

//And Buy items after clicking Purchase button
Then('Buy items after clicking Purchase button', function() {
    //Select country from dynamic dropdown
    bp.getInputBoxCountry().type('in')
        
    bp.getCountryList().each(($ele, index, $list) => {
        if($ele.text() == 'India') {
            cy.wrap($ele).click()
        }
    })

    //Check terms and conditions checkbox and validate
    bp.getCheckboxAgree().check({force: true}).should('be.checked')

    //Click on 'Purchase'
    bp.getButtonPurchase().click()

    //Validate Success message
    bp.getTextSuccessAlert().should('include.text','Success')
})