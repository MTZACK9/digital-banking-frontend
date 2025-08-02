import {HttpInterceptorFn} from '@angular/common/http';
import {Auth} from '../services/auth';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes('/auth/login')) {
    let authService = inject(Auth);
    let newRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authService.accessToken)
    })
    return next(newRequest).pipe(
      catchError(err => {
        if (err.status === 401) {
          authService.logout();
        }
        return throwError(() => err.message);
      })
    )
  } else {
    return next(req);
  }

};
