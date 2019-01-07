import { CounterState } from './counter/counter.state';
import { EmployeeState } from './employee/employee.state';
import { EmployeeEntityState } from './employee/employee.entity';

export type AppState = {
  count: CounterState,
  employees: EmployeeState,
  entity: EmployeeEntityState
}
