import { Employee } from 'src/app/employees/typings';
import { EmployeeFilteringCriteria } from 'src/app/employees/employee-model.service';

export type EmployeeState = {
  employees: Employee[]
  loading: boolean
  filters: EmployeeFilteringCriteria
}