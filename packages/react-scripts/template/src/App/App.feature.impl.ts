import * as api from 'gherkin-specs-api';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

api.featureSteps(/descriptive text of what is desired/)
    .given(/some precondition/, () => { 
        console.warn('Given not implemented'); 
    })
    .when(/some action by the actor/, () => { 
        console.warn('When not implemented');
    })
    .then(/some testable outcomee is here/, () => { 
        console.warn('Then not implemented');
        expect(true).toBe(true); 
    });