import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Account} from '../services/account';
import {catchError, Observable, throwError} from 'rxjs';
import {AccountDetails} from '../model/AccountModel';
import {AsyncPipe, DatePipe, DecimalPipe, NgClass} from '@angular/common';
import {Auth} from '../services/auth';


@Component({
  selector: 'app-accounts',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    DecimalPipe,
    DatePipe,
    NgClass
  ],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css'
})
export class Accounts {
  accountFormGroup!: FormGroup;
  currentPage: number = 0
  pageSize: number = 5;
  accountObservable!: Observable<AccountDetails>
  operationsFormGroup!: FormGroup;
  errMessage!: string;

  constructor(private readonly fb: FormBuilder, private readonly accountService: Account, protected readonly authService: Auth) {
  }

  ngOnInit() {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control(''),

    })
    this.operationsFormGroup = this.fb.group({
      operationType: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      accountDestination: this.fb.control(null),

    })
  }

  handleSearchAccount() {
    let accountId = this.accountFormGroup.value.accountId;
    this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errMessage = err.message;
        return throwError(() => err);
      })
    )
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount()
  }

  handleAccountOperation() {
    let accountId: string = this.accountFormGroup.value.accountId;
    let operationType = this.operationsFormGroup.value.operationType;
    let amount = this.operationsFormGroup.value.amount
    let description = this.operationsFormGroup.value.description
    let accountDestination = this.operationsFormGroup.value.accountDestination
    if (operationType == 'DEBIT') {
      this.accountService.debit(accountId, amount, description).subscribe({
        next: () => {
          alert("Successfully debit!");
          this.operationsFormGroup.reset()
          this.handleSearchAccount()
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    } else if (operationType == 'CREDIT') {
      this.accountService.credit(accountId, amount, description).subscribe({
        next: () => {
          alert("Successfully credit!");
          this.operationsFormGroup.reset()
          this.handleSearchAccount()
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    } else if (operationType == 'TRANSFER') {
      this.accountService.transfer(accountId, accountDestination, amount, description).subscribe({
        next: () => {
          alert("Successfully transfer!");
          this.operationsFormGroup.reset()
          this.handleSearchAccount()
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }
}
