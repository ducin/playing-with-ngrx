import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { EmployeesListComponent } from './employees-list/employees-list.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    EmployeesListComponent,
    LoaderComponent
  ],
  exports: [
    EmployeesListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
})
export class EmployeesModule { }
