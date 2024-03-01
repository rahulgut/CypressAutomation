// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
import productsPage from "../pageObjects/productsPage"
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
const ppc= new productsPage()
Cypress.Commands.add('selectProduct', (productName) => {
    //cy.get('.card-title a').each(($el, index, $list) => {
    ppc.getProductName().each(($el, index, $list) => {
        if($el.text() == productName) {
            cy.log($el.text())
            //cy.get('.card-footer button').eq(index).click()
            ppc.getButtonAddToCart().eq(index).click()
        }
    })
})

//Login API to login to website
Cypress.Commands.add('loginAPI', () => {
    cy.request('POST', 'https://rahulshettyacademy.com/api/ecom/auth/login', 
    {
        "userEmail": "rahuldhawan89@gmail.com",
        "userPassword": "Rahprrs1@"
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('message','Login Successfully')
        Cypress.env('sessionToken',response.body.token)
    })
})

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })