import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { counterReducer } from './counter/counter.reducer';
import { CounterEffects } from './counter/counter.effects';
import { MyCounterComponent } from './my-counter/my-counter.component';

import { employeeReducer } from './employee/employee.reducer';
import { EmployeeEffects } from './employee/employee.effects';
import { entityReducer } from './employee/employee.entity';

@NgModule({
  declarations: [MyCounterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({
      count: counterReducer,
      employees: employeeReducer,
      entity: entityReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: false
    }),
    EffectsModule.forRoot([
      CounterEffects,
      EmployeeEffects
    ])
  ],
  exports: [
    MyCounterComponent
  ]
})
export class AppStoreModule { }
