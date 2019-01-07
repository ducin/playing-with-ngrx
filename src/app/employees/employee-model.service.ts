import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { baseURL, tenantID } from './config';

import { Employee } from './typings';

// type EmployeeFilteringCriteria = {
//   nationality?: Employee["nationality"]
//   departmentId?: Employee["departmentId"]
//   contractType?: Employee["contractType"]
// }

export type EmployeeFilteringCriteria = Partial<
  Pick<Employee, "departmentId" | "contractType" | "nationality">
>

@Injectable({
  providedIn: 'root'
})
export class EmployeeModel {
  private headers = {
    'TenantID': tenantID
  }

  getEmployee(id: Employee["id"]){
    return this.http.get<Employee>(`${baseURL}/employees/${id}`, { headers: this.headers })
  }

  private getQueryString(criteria: EmployeeFilteringCriteria): string {
    const params = Object.entries(criteria)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
    return params ? `?${params}` : ''
  }

  getEmployees(criteria: EmployeeFilteringCriteria = {}){
    return this.http.get<Employee[]>(`${baseURL}/employees${this.getQueryString(criteria)}`, { headers: this.headers })
  }

  constructor(
    private http: HttpClient
  ) {}
}
