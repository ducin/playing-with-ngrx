import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, interval, Subject } from 'rxjs';
import { map, startWith, withLatestFrom, tap, combineLatest } from 'rxjs/operators';

import { Employee } from '../typings';
import { AppState } from 'src/app/app-store/app.state';
import { EmployeeFetch } from 'src/app/app-store/employee/employee.actions';
import { getEmployeesState } from 'src/app/app-store/employee/employee.selectors';
import { EmployeeState } from 'src/app/app-store/employee/employee.state';
import { EmployeeEntityState } from 'src/app/app-store/employee/employee.entity';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  employees$: Observable<Employee[]>
  loading$: Observable<boolean>
  employeesState$: Observable<EmployeeState>

  private chosenEmployeeId$ = new Subject<Employee["id"]>()
  chosenEmployee$: Observable<Employee> = this.store.select('entity').pipe(
    startWith(null),
    combineLatest(this.chosenEmployeeId$.asObservable(),
      (entity, id) => entity.entities[id] ? entity.entities[id] : 'none chosen'),
    tap(console.log),
  )

  private colors = ['red', 'green', 'blue']
  color$: Observable<string> = interval(3000).pipe(
    map((idx) => this.colors[idx % 3]),
    startWith('gold')
  )

  constructor(
    private store: Store<AppState>
  ) {}

  showDetails(id: Employee["id"]){
    this.chosenEmployeeId$.next(id)
  }

  reload() {
    this.store.dispatch(new EmployeeFetch({ criteria: {} }))
  }

  ngOnInit() {
    this.employeesState$ = this.store.select(getEmployeesState)

    this.employees$ = this.employeesState$.pipe(
      map(state => state.employees)
    )

    this.loading$ = this.employeesState$.pipe(
      map(state => state.loading)
    )

    this.store.dispatch(new EmployeeFetch({ criteria: {} }))
  }
}
