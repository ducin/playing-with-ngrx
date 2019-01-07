import { createSelector } from '@ngrx/store';

import { AppState } from '../app.state';

export const getEmployeesState = (state: AppState) => state.employees

export const getEmployeesCollection = createSelector(
  getEmployeesState,
  (state) => state.employees
)
