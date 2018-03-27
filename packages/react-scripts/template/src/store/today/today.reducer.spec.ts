import reducer from './today.reducer';
import { Action } from 'redux';
import * as moment from 'moment';
import { GET_TIME } from '.';

describe('reducer', () => {
    test('should initialise with Moment type', () => {
      const actual = reducer(undefined, { type: null } as Action);
      expect(actual as moment.Moment).toBeTruthy();
    });
    test('initial state must be now', () => {
      const actual = reducer(undefined, { type: null } as Action);
      expect(actual.format('YYYYDDMMHHmm')).toEqual(moment().format('YYYYDDMMHHmm'));
    });
    test('GET_TIME change time', () => {
      const actual = reducer(moment('201110311435', 'YYYYDDMMHHmm'), { type: GET_TIME } as Action);
      expect(actual.format('YYYYMMDDHHmm')).toEqual(moment().format('YYYYMMDDHHmm'));
    });
});