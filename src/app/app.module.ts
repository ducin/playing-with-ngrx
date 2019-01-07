import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppStoreModule } from './app-store/app-store.module';
import { EmployeesModule } from './employees/employees.module';

export const APItoken = new InjectionToken<string>('BASE_URL');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppStoreModule,
    EmployeesModule
  ],
  // providers: [
  //   { provide: APItoken, useValue: 'http://localhost:8080' }
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
