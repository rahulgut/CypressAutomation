Feature: End to end ecommerce validation

    Application Regression

    @Smoke
    Scenario: Fill the form before Shopping
    Given Open ecommerce webpage
    When Fill the form details
        | name | gender |
        | Spiderman | Male |
    Then Validate the form
    And Proceed to shop tab

    @Regression
    Scenario: Ecommerce application test suite
    Given Open ecommerce webpage
    When Add items to cart
    Then Proceed to purchase screen
    And Purchase the product after providing details