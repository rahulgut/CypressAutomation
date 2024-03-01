Feature: End to end ecommerce revise validation
        Application Regression

        @Smoke
        Scenario: Fill the form for ecom website
        Given Open ecommerce webpage where form is displayed
        When Fill the form details
            | name | gender |
            | Spiderman | Male |
        Then Validate the form
        And Proceed to Shop tab

        @Regression
        Scenario: Ecommerce application regression test suite
        Given Open ecommerce webpage where products are displayed
        When Add items to cart
        Then Validate items and proceed to buy page
        And Buy items after clicking Purchase button