import { Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Employee } from '../../employees/typings';



export interface EmployeeEntityState extends EntityState<Employee> {
  selectedEmployeeId: Employee["id"] | null;
}

export function selectEmployeeId(e: Employee): Employee["id"] {
  return e.id;
}

export function sortByLastName(a: Employee, b: Employee): number {
  return a.lastName.localeCompare(b.lastName);
}

export const adapter: EntityAdapter<Employee> = createEntityAdapter<Employee>({
  selectId: selectEmployeeId,
  sortComparer: sortByLastName,
});


export const initialState: EmployeeEntityState = adapter.getInitialState({
  selectedEmployeeId: null,
});

export enum EmployeeActionTypes {
  LOAD_EMPLOYEES = 'LOAD_EMPLOYEES',
  DELETE_EMPLOYEES = 'DELETE_EMPLOYEES',
  CLEAR_EMPLOYEES = 'CLEAR_EMPLOYEES',
}


export class LoadEmployees implements Action {
  readonly type = EmployeeActionTypes.LOAD_EMPLOYEES;

  constructor(public payload: { employees: Employee[] }) { }
}

export class DeleteEmployee implements Action {
  readonly type = EmployeeActionTypes.DELETE_EMPLOYEES;

  constructor(public payload: { id: Employee["id"] }) { }
}

export class ClearEmployees implements Action {
  readonly type = EmployeeActionTypes.CLEAR_EMPLOYEES;
}

export type EmployeeActionsUnion = LoadEmployees | DeleteEmployee | ClearEmployees



export function entityReducer(state = initialState, action: EmployeeActionsUnion): EmployeeEntityState {
  switch (action.type) {

    case EmployeeActionTypes.DELETE_EMPLOYEES: {
      return adapter.removeOne(action.payload.id, state);
    }

    case EmployeeActionTypes.LOAD_EMPLOYEES: {
      return adapter.addAll(action.payload.employees, state);
    }

    case EmployeeActionTypes.CLEAR_EMPLOYEES: {
      return adapter.removeAll({ ...state, selectedEmployeeId: null });
    }

    default: {
      return state;
    }
  }
}

export const getSelectedEmployeeId = (state: EmployeeEntityState) => state.selectedEmployeeId;
