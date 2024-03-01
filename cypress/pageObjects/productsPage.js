class productsPage {

    getProductName() {
        return cy.get('.card-title a')
    }

    getButtonAddToCart() {
        return cy.get('.card-footer button')
    }

    getButtonCheckoutCart() {
        return cy.contains('Checkout')
    }
}
export default productsPage