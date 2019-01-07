import { Action } from '@ngrx/store';

export enum ActionTypes {
  Increment = 'INC',
  Decrement = 'DEC',
  Reset = 'RESET',
}

export class Increment implements Action {
  readonly type = ActionTypes.Increment;
}

export class Decrement implements Action {
  readonly type = ActionTypes.Decrement;
}

export class Reset implements Action {
  readonly type = ActionTypes.Reset;
}

export type CounterActions = Increment | Decrement | Reset;
