import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store'
import { Effect, ofType, Actions } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { switchMap, mergeMap, map, catchError } from 'rxjs/operators';

import { EmployeeModel } from 'src/app/employees/employee-model.service';
import { EmployeeActions, EmployeeFetchSuccess, EmployeeFetchFailure } from './employee.actions';
import { LoadEmployees } from 'src/app/app-store/employee/employee.entity';

@Injectable()
export class EmployeeEffects {

  @Effect()
  fetchEmployees$: Observable<Action> = this.actions$.pipe(
    ofType('EMPLOYEE_FETCH'),
    switchMap(action => {
      return this.employeeModel.getEmployees(action.payload.criteria)
        .pipe(
          // w/o adapter
          // map(data => new EmployeeFetchSuccess({ data })),
          // w/ adapter
          mergeMap(data => of(
            new EmployeeFetchSuccess({ data }),
            new LoadEmployees({ employees: data }),
          )),
          catchError(error => of(new EmployeeFetchFailure({ error })))
        )
    })
  )

  constructor(
    private employeeModel: EmployeeModel,
    private actions$: Actions<EmployeeActions>
  ){}
}
