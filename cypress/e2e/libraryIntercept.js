describe('My Labrary API Test Suite', function() {
    it('Library API response intercept test', function() {

        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')

        //Mocking API response with only 1 book data
        cy.intercept({ 
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        },
        {
            statusCode: 200,
            body: [{
                "book_name": "RestAssured with Java",
                "isbn": "BSG",
                "aisle": "2302"
            }]
        }).as('bookDetails')

        cy.get('button').contains('Virtual Library').click()
        cy.wait('@bookDetails').then(({request,response}) => {
            //Validate count of data rows
            cy.get('tbody tr').should('have.length',response.body.length)
        })

        //Validate single book message
        cy.get('p').should('have.text','Oops only 1 Book available')
    })

    it('Library API request intercept test', function() {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')

        //Mocking API request with wrong author name
        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (req) => {
            req.url= 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=rahul'
            req.continue((res) => {
                //expect(res.statusCode).to.eql('403')
            })
        }).as('wrongUrl')

        cy.get('button').contains('Virtual Library').click()
        cy.wait('@wrongUrl')
    })
})