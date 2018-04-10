@source ./App.feature.impl.ts
Feature: Show current date and time

  Scenario: My title show time to the second
    Given I am on the application
     When I wait some ticks
     Then Time as changed 