import { EmployeeState } from './employee.state';
import { EmployeeActions, ActionTypes } from './employee.actions';
import { adapter } from './employee.entity';

export const initialState: EmployeeState = {
  loading: false,
  filters: {},
  employees: null,
}

export const employeeReducer = (state = initialState, action: EmployeeActions) => {
  switch(action.type) {
    case ActionTypes.Fetch:
      return { ...state, loading: true, employees: null }

    case ActionTypes.FetchSuccess:
      return { ...state, employees: action.payload.data, loading: false }

    case ActionTypes.FetchFailure:
      return { ...state, loading: false }

    default:
      return state
  }
}
