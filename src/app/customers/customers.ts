import {Component, OnInit} from '@angular/core';
import {Customer} from '../serivces/customer';

@Component({
  selector: 'app-customers',
  imports: [],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers implements OnInit {
  customers: any;
  errorMessage!: string;

  constructor(private readonly customerService: Customer) {
  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe({
      next: data => {
        this.customers = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
