const neatCSV= require('neat-csv')


describe('JWT Session token test suite', function() {

    before(function() {
        cy.fixture('ecomProducts').then((data) => {
            this.data=data
        })
    })

    it('Login by inserting token in local storage', function() {

        cy.loginAPI().then(() => {
            cy.visit('https://rahulshettyacademy.com/client', {
                onBeforeLoad: function(window) {
                    window.localStorage.setItem('token', Cypress.env('sessionToken'))
                }
            })
        })

        //Add product to cart
        this.data.productName.forEach((element) => {
            cy.get('.card b').each(($el, index, $list) => {
                cy.log($el.text())
                if($el.text() == element) {
                    cy.get('.card').eq(index).find('button').contains(' Add To Cart').click({force: true})
                }
            })
        })

        //Click cart icon
        cy.get('li button').contains('Cart').click()

        //Validate sum of items added
        var sum=0
        var itemAmount
        var totalVal
        cy.get('.prodTotal p').each(($j, index, $list) => {
            itemAmount= parseInt($j.text().split(' ')[1].trim())
            cy.log(itemAmount)
            
            sum=sum + itemAmount
            cy.log(sum)
        })
        cy.get('.totalRow:nth-child(2) span[class="value"]').then((total) => {
            totalVal= parseInt(total.text().substring(1).trim())
            expect(sum).to.eql(totalVal)
        })

        //Click Checkout button
        cy.get('button').contains('Checkout').click()

        //Select country from dyanmic dropdown
        cy.get('input[placeholder="Select Country"]').type('Ind')
        cy.get('.ta-results button').each(($i, index, $list) => {
            if($i.text() == ' India') {
                cy.wrap($i).click()
            }
        })

        //Click Place order
        cy.get('.actions a').click()

        //Getting order id
        var orderId
        cy.get('td label.ng-star-inserted').then((id) => {
            orderId= id.text().trim().split(' ')[1]
            cy.log(orderId)
        })

        //Click button to download csv
        cy.get('tr button').contains('Click To Download Order Details in CSV').click()

        //CSV File path
        const filePathCSV= Cypress.config('fileServerFolder')+'/cypress/downloads/order-invoice_rahuldhawan89.csv'
        
        //Reading CSV file
        cy.readFile(filePathCSV).then(async(textFile) => {
            const csvObj= await neatCSV(textFile)
            var csvFirstProductName= csvObj[0]['Product Name']
            cy.log(csvFirstProductName)

            //Validate Product name

            //Hardcoded validation
            //expect(csvFirstProductName).to.eql(this.data.productName[0])

            //Validating each product name from ecomProducts.json in CSV file
            this.data.productName.forEach((itemName) => {
                cy.readFile(filePathCSV).then((csvFileContent) => {
                    expect(csvFileContent).to.include(itemName)
                })
            })

            //Validate Order ID

            //Hardcoded validation
            //expect(csvObj[0]['Invoice Number']).to.eql(orderId)

            //Validating CSV file content for Order ID
            cy.readFile(filePathCSV).then((csvFileContent) => {
                expect(csvFileContent).to.include(orderId)
            })
            
        })

        //Click button to download excel
        cy.get('tr button').contains('Excel').click()

        //Excel File path
        const filePathExcel= Cypress.config('fileServerFolder')+'/cypress/downloads/order-invoice_rahuldhawan89.xlsx'

        //Task created in cypress.config.js for reading excel file
        cy.task('excelToJsonConverter', filePathExcel).then((result) => {
            cy.log(result.data[1].A)
            
            //Validating Product name

            //Hardcoded validation (Works only for one product in ecomProducts.json file)
            //expect(result.data[1].B).to.eql(this.data.productName[0])

            //Validating each product name from ecomProducts.json in CSV file
            this.data.productName.forEach((itemName) => {
                cy.readFile(filePathExcel).then((excelFileContent) => {
                    expect(excelFileContent).to.include(itemName)
                })
            })

            //Validating Order ID (Works only for one product in ecomProducts.json file)
            //expect(result.data[1].A).to.eql(orderId)
        })
    })
})