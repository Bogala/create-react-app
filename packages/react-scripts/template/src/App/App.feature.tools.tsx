import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { configure, mount } from 'enzyme';
import App from './';
import { Provider } from 'react-redux';
import 'rxjs/Rx';
import { configureStore } from '../store';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

export const wait = (miliseconds: number = 1000) => {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > miliseconds) {
            break;
        }
    }
};

// tslint:disable-next-line:no-any
export const getWrapper = () => (
    mount(
        <Provider store={configureStore()}>
            <App />
        </Provider>
    )
);