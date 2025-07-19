import {Component, OnInit} from '@angular/core';
import {Customer} from '../serivces/customer';
import {catchError, Observable, throwError} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {CustomerModel} from '../model/CustomerModel';

@Component({
  selector: 'app-customers',
  imports: [
    AsyncPipe
  ],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers implements OnInit {
  customers!: Observable<Array<CustomerModel>>;
  errorMessage!: any;

  constructor(private readonly customerService: Customer) {
  }

  ngOnInit() {
    this.customers = this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage = err
        return throwError(() => err)
      })
    );
  }

}
