class buyPage {

    getInputBoxCountry() {
        return cy.get('#country')
    }

    getCountryList() {
        return cy.get('.suggestions a')
    }

    getCheckboxAgree() {
        return cy.get('#checkbox2')
    }

    getButtonPurchase() {
        return cy.get('.btn-success')
    }

    getTextSuccessAlert() {
        return cy.get('.alert-success')
    }
}
export default buyPage