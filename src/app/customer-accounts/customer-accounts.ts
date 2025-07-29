import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerModel} from '../model/CustomerModel';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-customer-accounts',
  imports: [
    JsonPipe
  ],
  templateUrl: './customer-accounts.html',
  styleUrl: './customer-accounts.css'
})
export class CustomerAccounts {
  customerId!: string;
  customer!: CustomerModel;
  constructor(private readonly route : ActivatedRoute, private readonly router : Router) {
  this.customer = this.router.getCurrentNavigation()?.extras.state as CustomerModel;
  }

  ngOnInit() {
    this.customerId = this.route.snapshot.params['id'];
  }

}
