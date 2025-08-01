import { HttpInterceptorFn } from '@angular/common/http';
import {Auth} from '../services/auth';
import {inject} from '@angular/core';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  if(!req.url.includes('/auth/login')) {
    let authService = inject(Auth);
    let newRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authService.accessToken)
    })
    return next(newRequest);
  }
  else {
    return next(req);
  }

};
