import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Auth} from '../services/auth';

export const authorizationGuard: CanActivateFn = (route, state) => {
  let authService = inject(Auth)
  let router = inject(Router);
  if(authService.roles.includes('ROLE_ADMIN')){
    return true;
  }
  router.navigateByUrl("admin/not-authorized");
  return false;
};
