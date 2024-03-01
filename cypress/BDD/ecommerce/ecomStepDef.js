import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import homePage from "../../pageObjects/homePage";
import productsPage from "../../pageObjects/productsPage";
import cartPage from "../../pageObjects/cartPage";
import buyPage from "../../pageObjects/buyPage";

const hp= new homePage()
const pp= new productsPage()
const cp= new cartPage()
const bp= new buyPage()

let custName

//Given Open ecommerce webpage
Given('Open ecommerce webpage', function() {
    cy.visit(Cypress.env('url')+'/angularpractice/')
})

//When Fill the form details
/*When('Fill the form details', function() {
    //Fetching data from fixture file
    hp.getInputBoxName().type(this.data.name)
    hp.getSelectGender().select(this.data.gender)
})*/

//When Fill the form details
When('Fill the form details', function(dataTable) {
    //Fetching data from ecommerce.feature file
    custName= dataTable.rawTable[1][0]
    hp.getInputBoxName().type(custName)
    hp.getSelectGender().select(dataTable.rawTable[1][1])
})

//Then Validate the form
Then('Validate the form', function() {
    //Verifying name in two-way data binding field
    //hp.getInputBoxVerifyName().should('have.value',this.data.name)
    hp.getInputBoxVerifyName().should('have.value',custName)

    //Verify minlength attribute for input field
    hp.getInputBoxName().should('have.attr','minlength','2')

    //Verify entrepreneur radio button is disables
    hp.getRadioButtonEntrepreneur().should('be.disabled')
})

//And Proceed to shop tab
Then('Proceed to shop tab', function() {
    //Click on Shop tab
    hp.getTabShop().click()
})

//When Add items to cart
When('Add items to cart', function() {

    hp.getTabShop().click()
    //Adding products by iterating through array from example.json
    this.data.productName.forEach((element) => {
        cy.selectProduct(element)
    });
    //Click checkout cart button
    pp.getButtonCheckoutCart().click()
})

//Then Proceed to purchase screen
Then('Proceed to purchase screen', function() {
    var sum=0
    let total=0
    cp.getProductPrice().each(($i, index, $list) => {
        const val= $i.text()
        cy.log(val)
        const amountStr= val.split(' ')[1]
        cy.log(amountStr)
        sum=sum+parseInt(amountStr)
        cy.log(sum)
    })
    cp.getTotalPrice().then((totalVal) => {
        cy.log(totalVal.text())
        total= parseInt(totalVal.text().split(' ')[1])
        cy.log(total)
        expect(sum).to.be.eql(total)
    })

    //Click checkout button
    cp.getButtonCheckout().click()
})

//And Purchase the product after providing details
Then('Purchase the product after providing details', function() {
    //Type 'ind' and select India in dynamic dropdown
    bp.getInputBoxCountry().type('ind')

    //default command timeout update
    Cypress.config('defaultCommandTimeout',6000)
    bp.getCountryList().each(($element, index, $list) => {
        cy.log($element.text())
        if($element.text() == 'India') {
            cy.wrap($element).click()
        }
    })

    //Checkox 'I agree'
    bp.getCheckboxAgree().check({force: true})

    //Click 'Purchase' button
    bp.getButtonPurchase().click()

    //Validate success message
    bp.getTextSuccessAlert().should('contain.text','Success')
})