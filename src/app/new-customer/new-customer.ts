import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CustomerModel} from '../model/CustomerModel';
import {Customer} from '../serivces/customer';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-customer',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-customer.html',
  styleUrl: './new-customer.css'
})
export class NewCustomer {
  newCustomerFormGroup!: FormGroup;
  constructor(private readonly fb: FormBuilder, private readonly customerService: Customer, private readonly router: Router) {}

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
    })
  }

  handleSaveCustomer() {
    let customer: CustomerModel = this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next: (data) => {
        alert("Customer saved successfully!");
        this.router.navigateByUrl('/customers');
      },
      error: (err) => {
        console.log(err);
      }
    });

  }
}
