describe('Library API test suite', function() {
    it('Add book API request test', function() {

        cy.request('POST','https://rahulshettyacademy.com/Library/Addbook.php', 
        {
            "name":"Baby Sharks",
            "isbn":"lawx",
            "aisle":"9094",
            "author":"Baby"
        }
        ).then((response) => {
            expect(response.body).to.have.property('Msg','successfully added')
            expect(response.status).to.eq(200)
        })
    })
})