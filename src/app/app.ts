import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Auth} from './services/auth';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('digital-banking-frontend');
  constructor(private readonly authService : Auth) {
  }
  ngOnInit() {
    this.authService.loadJwtFromLocalStorage()
  }
}
