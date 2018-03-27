import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { configure, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import * as moment from 'moment';
import App from './';
import { PLAY } from '../store/today/today.actions';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });
jest.useFakeTimers();

const mockStore = configureStore();
const store = mockStore({today: moment()});

describe('App container', () => {
    test('renders without crashing', () => {
        const wrapper = mount(<App />, { context: { store } });
        expect(wrapper.length).toEqual(1);
        expect(store.getActions()).toEqual([{type: PLAY}]);
    });
});