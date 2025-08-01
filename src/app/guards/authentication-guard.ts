import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Auth} from '../services/auth';

export const authenticationGuard: CanActivateFn = (route, state) => {
  let authService = inject(Auth);
  let router = inject(Router);
  if(authService.isAuthenticated){
    return true
  }
  router.navigateByUrl("/login")
  return false;
};
