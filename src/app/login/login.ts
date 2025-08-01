import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Auth} from '../services/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  formLogin!: FormGroup;
  constructor(private readonly fb: FormBuilder, private readonly auth: Auth, private readonly router: Router) {}

  ngOnInit() {
    this.formLogin = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    })
  }

  handleLogin() {
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    this.auth.login(username, password).subscribe({
      next: (result) => {
        this.auth.loadProfile(result);
        this.router.navigateByUrl('/admin');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
