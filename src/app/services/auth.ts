import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  isAuthenticated: boolean = false;
  roles : any;
  username : any;
  accessToken!: any;

  constructor(private readonly http: HttpClient) {}
  backendHost: string = 'http://localhost:8080';
  public login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    }
    let params = new HttpParams().set('username', username).set('password', password);
    return this.http.post(`${this.backendHost}/auth/login`,params, options)
  }

  loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['access-token'];
    let decodeJwt: any = jwtDecode(this.accessToken);
    this.username = decodeJwt.sub;
    this.roles = decodeJwt.scope;
  }

  logout() {
    this.isAuthenticated = false
    this.accessToken = undefined
    this.username = undefined
    this.roles = undefined
  }
}
