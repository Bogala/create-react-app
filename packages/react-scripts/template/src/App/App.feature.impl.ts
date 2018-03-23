import * as api from 'gherkin-specs-api';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

api.featureSteps('descriptive text of what is desired')
    .scenario('Some determinable business sitsuation')
        .given('some precondition', () => {
            // GIVEN
            console.log('given');
        })
        .when('some action by the actor', () => {
            // WHEN
            console.log('when');
        })
        .then('some testable outcomee is here', () => {
            // THEN
            console.log('then');
            expect(true).toBe(true);
        });