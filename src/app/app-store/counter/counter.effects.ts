import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { Observable, of, NEVER } from 'rxjs';
import { mergeMap, switchMap, withLatestFrom, tap } from 'rxjs/operators';

import { CounterActions } from './counter.actions';
import { AppState } from '../app.state';

@Injectable()
export class CounterEffects {
  @Effect()
  Log$: Observable<Action> = this.actions$.pipe(
    ofType('RESET'),
    mergeMap(action => of({ type: "LOG" }, { type: "YO" }))
  )

  // note `dispatch:false` AND the type `Observable<Action>` removed
  @Effect({ dispatch: false })
  NoDispatch$ = this.actions$.pipe(
    ofType('INC'),
    withLatestFrom(this.store$),
    tap(([action, state]) => {
      console.log('yo interceptor', action, state)
    })
  )

  constructor(
    private http: HttpClient,
    private actions$: Actions<CounterActions>,
    private store$: Store<AppState>
  ){}
}
