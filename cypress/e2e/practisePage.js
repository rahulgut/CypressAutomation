/// <reference types='Cypress' />
/// <reference types='cypress-iframe' />
import 'cypress-iframe'

describe('Practise Page test suite', function() {
    it('Practise page test', function() {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        //Checkbox and chai assertions
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get('input[type="checkbox"]').check().uncheck()
        cy.get('input[type="checkbox"]').check(['option2'])

        //Static dropdown
        cy.get('select').select('option1').should('have.value','option1')

        //Dynamic dropdown
        cy.get('#autocomplete').type('ind')
        cy.wait(2000)
        cy.get('ul li div').each(($el, index, $list) => {
            const countryName= $el.text()
            cy.log(countryName)
            if(countryName == 'India') {
                cy.wrap($el).click()
            }
        })
        
        //Assertion to check value of dynamic dropdown
        cy.get('#autocomplete').should('have.value','India')

        //Hide show textbox
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')

        //Radiobutton
        cy.get('input[value="radio1"]').check().should('be.checked')

        //Popup alert
        cy.get('#name').type('Babu Rao')
        cy.get('#alertbtn').click()
        cy.on('window:alert', (str) => {
            expect(str).to.be.eql('Hello Babu Rao, share this practice page and share your knowledge')
        })

        //Confirm alert
        cy.get('#name').type('Spiderman')
        cy.get('#confirmbtn').click()
        cy.on('window:confirm', (str) => {
            expect(str).to.be.eql('Hello Spiderman, Are you sure you want to confirm?')
        })

        //Web table selecting adjacent row value against the course name
        cy.get('table[name="courses"] tr td:nth-child(2)').each(($el, index, $list) => {
            const courseName= $el.text()
            //cy.log(courseName)
            if(courseName.includes('Selenium Automation')) {
                cy.log($el.next().text())
            }
        })

        //Mouse hover
        cy.get('.mouse-hover-content').invoke('show')
        cy.contains('Top').click()
        cy.url().should('include','top')

        //Open tab in same window. Cypress works only on same tab
        //cy.get('#opentab').invoke('removeAttr','target').click()

        //Click about on qaclickacademy.com which is different domain. Cypress doesn't allow change of domain
        /*cy.origin('https://www.qaclickacademy.com/',() => {
            cy.get('.sub-menu-bar ul li a[href="about.html"]').click()
            cy.get('.mt-50 h2').should('contain','Welcome to QAClick Academy')
        })*/

        //Child window
        //cy.get('#openwindow').invoke('removeAttr','onclick').click()
        /*cy.origin('https://www.qaclickacademy.com/',() => {
            cy.get('.sub-menu-bar ul li a[href="about.html"]').click()
        })*/

        //Frames
        cy.frameLoaded('#courses-iframe')
        cy.iframe().find('li a[href="mentorship"]').eq(0).click()
        


    })
})