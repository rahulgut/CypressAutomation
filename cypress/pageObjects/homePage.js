class homePage {

    getInputBoxName() {
        return cy.get('.form-group input[name="name"]')
    }

    getSelectGender() {
        return cy.get('#exampleFormControlSelect1')
    }

    getInputBoxVerifyName() {
        return cy.get('h4 input')
    }

    getRadioButtonEntrepreneur() {
        return cy.get('#inlineRadio3')
    }

    getTabShop() {
        return cy.contains('Shop')
    }
}
export default homePage