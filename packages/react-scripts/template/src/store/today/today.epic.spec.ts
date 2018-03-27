import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { createEpicMiddleware } from 'redux-observable';

import configureStore, { MockStore } from 'redux-mock-store';
import 'rxjs/Rx';
import epic from './today.epic';
import { PLAY, GET_TIME } from './today.actions';

configure({ adapter: new Adapter() });

jest.useFakeTimers();

const epicMiddleware = createEpicMiddleware(epic);
const mockStore = configureStore([epicMiddleware]);

let store: MockStore<{}>;

describe('Epic', () => {
    afterEach(() => {
        epicMiddleware.replaceEpic(epic);
        jest.clearAllTimers();
    });

    test('Dispatch played when launched', () => {
        store = mockStore();
        store.dispatch({type: PLAY});
        jest.runOnlyPendingTimers();
        expect(store.getActions()).toEqual([
            { type: PLAY },
            { type: GET_TIME }
        ]);
    });
});