import reducer from './App.reducer';
import { Action } from 'redux';
import * as moment from 'moment';

describe('reducer', () => {
    test('should initialise with Moment type', () => {
      const actual = reducer(undefined, { type: null } as Action);
      expect(actual as moment.Moment).toBeTruthy();
    });
});