class cartPage {

    getProductPrice() {
        return cy.get('td:nth-child(4) strong')
    }

    getTotalPrice() {
        return cy.get('h3 strong')
    }

    getButtonCheckout() {
        return cy.get('.btn-success')
    }
}
export default cartPage