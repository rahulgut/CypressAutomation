describe('SQL Server DB test suite', function() {
    it('Fetching data from SQL Server test', function() {

        cy.sqlServer('select * from Persons').then((result) => {
            cy.log(result[0][1])
        })
    })
})