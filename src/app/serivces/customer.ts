import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Customer {
  constructor(private readonly http: HttpClient) {}

  public getCustomers() : Observable<any> {
    return this.http.get("http://localhost:8080/customers");
  }
}
