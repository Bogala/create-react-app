import { combineEpics } from 'redux-observable';
import { epic as today } from './today';

export default combineEpics(
    today
);