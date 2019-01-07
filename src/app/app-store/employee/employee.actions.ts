import { Action } from '@ngrx/store';

import { Employee } from 'src/app/employees/typings';
import { EmployeeFilteringCriteria } from 'src/app/employees/employee-model.service';

export enum ActionTypes {
  Fetch = 'EMPLOYEE_FETCH',
  FetchSuccess = 'EMPLOYEE_FETCH_SUCCESS',
  FetchFailure = 'EMPLOYEE_FETCH_FAILURE',
}

export class EmployeeFetch implements Action {
  readonly type = ActionTypes.Fetch
  constructor(public payload: {
    criteria: EmployeeFilteringCriteria
  }){}
}

export class EmployeeFetchSuccess implements Action {
  readonly type = ActionTypes.FetchSuccess
  constructor(public payload: {
    data: Employee[]
  }){}
}

export class EmployeeFetchFailure implements Action {
  readonly type = ActionTypes.FetchFailure
  constructor(public payload: {
    error: Error
  }){}
}

export type EmployeeActions = EmployeeFetch | EmployeeFetchSuccess | EmployeeFetchFailure
