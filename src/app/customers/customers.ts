import {Component, OnInit} from '@angular/core';
import {Customer} from '../serivces/customer';
import {catchError, map, Observable, throwError} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {CustomerModel} from '../model/CustomerModel';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customers',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers implements OnInit {
  customers!: Observable<Array<CustomerModel>>;
  errorMessage!: any;
  searchFormGroup!: FormGroup;

  constructor(private readonly customerService: Customer, private readonly fb: FormBuilder, private readonly router: Router) {
  }

  ngOnInit() {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    })
    this.handleSearchCustomers()
  }

  handleSearchCustomers() {
    let kw = this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err
        return throwError(() => err)
      })
    );
  }

  handleDeleteCustomer(customer: CustomerModel) {
    this.customerService.deleteCustomer(customer.id).subscribe({
      next: () => {
        this.customers = this.customers.pipe(
          map(data => {
            let index = data.indexOf(customer);
            data.slice(index, 1);
            return data;
          })
        )
      },
      error: err => {
        console.log(err)
      }
    })
  }

  handleCustomerAccounts(customer: CustomerModel) {
    this.router.navigateByUrl("/customer-accounts/" + customer.id, {
      state: customer
    });
  }
}
