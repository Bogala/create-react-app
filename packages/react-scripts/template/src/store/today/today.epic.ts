import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { ActionsObservable, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Rx';
import { Action, Store } from 'redux';
import { PLAY, GET_TIME } from './today.actions';

const play = (action$: ActionsObservable<Action>, store: Store<{}>, { }) =>
    action$.ofType(PLAY)
        .switchMap(() =>
            Observable.interval(1000)
                .mapTo({type: GET_TIME})
        );

export default combineEpics(
    play
);