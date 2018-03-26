import * as moment from 'moment';
import { Action } from 'redux';
import { GET_TIME } from '.';

export default (state: moment.Moment = moment(), action: Action) => {
    switch (action.type) {
      case GET_TIME: {
        return moment(Date.now());
      }
      default:
        return state;
    }
  };