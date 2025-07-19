import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerModel} from '../model/CustomerModel';

@Injectable({
  providedIn: 'root'
})
export class Customer {
  constructor(private readonly http: HttpClient) {}

  public getCustomers() : Observable<Array<CustomerModel>> {
    return this.http.get<Array<CustomerModel>>("http://localhost:8080/customers");
  }
}
